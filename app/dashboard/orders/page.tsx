"use client"

import { useState, useEffect } from 'react'
import { OrderList } from '../components/OrderList'
import { FilterPanel } from '../components/FilterPanel'
import { OrderDetailsModal } from '../components/OrderDetailsModal'
import { Order, OrderStatus } from '@/app/types'
import { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'

// Mock data for initial orders
const initialOrders: Order[] = [
  {
    id: '1',
    customerName: 'John Doe',
    customerImage: '/placeholder.svg?height=50&width=50',
    items: [
      { 
        name: 'Spaghetti Carbonara', 
        quantity: 2, 
        price: 15.99,
        removedIngredients: ['Pancetta']
      },
      { 
        name: 'Caesar Salad', 
        quantity: 1, 
        price: 8.99,
        removedIngredients: ['Croutons', 'Parmesan']
      }
    ],
    totalPrice: 40.97,
    orderDate: new Date('2023-06-10T14:30:00'),
    status: 'Pending',
    paymentStatus: 'Paid',
    dietaryComments: 'Please ensure all dishes are gluten-free. Severe allergy.',
    estimatedReadyDateTime: addDays(new Date('2023-06-10T14:30:00'), 2)
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerImage: '/placeholder.svg?height=50&width=50',
    items: [
      { 
        name: 'Margherita Pizza', 
        quantity: 1, 
        price: 12.99,
        removedIngredients: []
      }
    ],
    totalPrice: 12.99,
    orderDate: new Date('2023-06-11T18:45:00'),
    status: 'In Progress',
    paymentStatus: 'Unpaid',
    dietaryComments: '',
    estimatedReadyDateTime: addDays(new Date('2023-06-11T18:45:00'), 2)
  },
]

const ITEMS_PER_PAGE = 10

export default function OrderManagementPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    status: 'all',
    paymentStatus: 'all',
    searchTerm: '',
    dateRange: { from: null, to: null } as DateRange | undefined,
    cuisine: 'all',
    showTodayOrders: false,
  })

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
  }

  const handleCloseModal = () => {
    setSelectedOrder(null)
  }

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus, cancellationReason?: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          let updatedOrder = { ...order, status: newStatus };
          if (newStatus === 'paid') {
            updatedOrder.paymentStatus = 'Paid';
          } else if (newStatus === 'cancelled') {
            updatedOrder.paymentStatus = 'Cancelled';
            updatedOrder.cancellationReason = cancellationReason;
          }
          return updatedOrder;
        }
        return order;
      })
    );
    setSelectedOrder(prevOrder => 
      prevOrder && prevOrder.id === orderId ? { ...prevOrder, status: newStatus, cancellationReason } : prevOrder
    );
  };

  const handleUpdateEstimatedReadyDateTime = (orderId: string, newDateTime: Date) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, estimatedReadyDateTime: newDateTime } : order
      )
    );
    setSelectedOrder(prevOrder =>
      prevOrder && prevOrder.id === orderId ? { ...prevOrder, estimatedReadyDateTime: newDateTime } : prevOrder
    );
  };

  const filteredOrders = orders
    .filter(order => {
      const matchesStatus = filters.status === 'all' || order.status === filters.status
      const matchesPaymentStatus = filters.paymentStatus === 'all' || order.paymentStatus === filters.paymentStatus
      const matchesSearch = order.customerName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                            order.id.toLowerCase().includes(filters.searchTerm.toLowerCase())
      const matchesDateRange = !filters.dateRange?.from || !filters.dateRange?.to || 
                              (order.orderDate >= filters.dateRange.from && order.orderDate <= filters.dateRange.to)
      const matchesTodayOrders = !filters.showTodayOrders || 
                               (new Date(order.estimatedReadyDateTime).toDateString() === new Date().toDateString())

      return matchesStatus && matchesPaymentStatus && matchesSearch && matchesDateRange && matchesTodayOrders
    })
    .sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime()) // Sort by date, most recent first

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Management</h1>
      <div className="space-y-8">
        <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        <OrderList
          orders={paginatedOrders}
          onOrderClick={handleOrderClick}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={handleCloseModal}
          onUpdateStatus={handleUpdateOrderStatus}
          onUpdateEstimatedReadyDateTime={handleUpdateEstimatedReadyDateTime}
        />
      )}
    </div>
  )
}

