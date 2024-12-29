"use client"

import { useState, useEffect } from 'react'
import { BookingList } from './components/BookingList'
import { BookingFilters } from './components/BookingFilters'
import { NotificationBanner } from './components/NotificationBanner'
import { BookingRequest } from '@/app/types'
import { generateMockBookings } from '@/lib/mockData'

const ITEMS_PER_PAGE = 10

export default function BookingManagementPage() {
  const [bookings, setBookings] = useState<BookingRequest[]>([])
  const [filteredBookings, setFilteredBookings] = useState<BookingRequest[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    serviceType: 'all',
    status: 'all',
    searchTerm: '',
  })

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchedBookings = generateMockBookings(50)
    setBookings(fetchedBookings)
    setFilteredBookings(fetchedBookings)
  }, [])

  useEffect(() => {
    const newFilteredBookings = bookings.filter((booking) => {
      const matchesServiceType = filters.serviceType === 'all' || booking.serviceType === filters.serviceType
      const matchesStatus = filters.status === 'all' || booking.status === filters.status
      const matchesSearch = booking.userName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                            booking.eventType.toLowerCase().includes(filters.searchTerm.toLowerCase())
      return matchesServiceType && matchesStatus && matchesSearch
    })
    setFilteredBookings(newFilteredBookings)
    setCurrentPage(1) // Reset to first page when filters change
  }, [bookings, filters])

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    )
    setBookings(updatedBookings)
  }

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE)
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Booking Management</h1>
      <NotificationBanner bookings={bookings} />
      <BookingFilters filters={filters} setFilters={setFilters} />
      <BookingList 
        bookings={paginatedBookings} 
        onStatusChange={handleStatusChange}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

