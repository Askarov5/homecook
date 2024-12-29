import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Order } from '@/app/types'
import { format } from 'date-fns'
import { Card, CardContent } from "@/components/ui/card"

interface OrderListProps {
  orders: Order[]
  onOrderClick: (order: Order) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function OrderList({ orders, onOrderClick, currentPage, totalPages, onPageChange }: OrderListProps) {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Estimated Ready</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} onClick={() => onOrderClick(order)} className="cursor-pointer hover:bg-gray-100">
                <TableCell>{order.id}</TableCell>
                <TableCell className="flex items-center space-x-2">
                  <img src={order.customerImage} alt={order.customerName} className="w-8 h-8 rounded-full" />
                  <span>{order.customerName}</span>
                </TableCell>
                <TableCell>{order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}</TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{format(order.orderDate, 'PPp')}</TableCell>
                <TableCell>{format(order.estimatedReadyDateTime, 'PPp')}</TableCell>
                <TableCell>
                  <Badge variant={
                    order.status === 'completed' ? 'default' :
                    order.status === 'in_progress' ? 'secondary' :
                    order.status === 'cancelled' ? 'destructive' :
                    'outline'
                  }>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={order.paymentStatus === 'Paid' ? 'default' : 'destructive'}>
                    {order.paymentStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

