import { useState } from 'react'
import { BookingCard } from './BookingCard'
import { BookingDetailModal } from './BookingDetailModal'
import { BookingRequest } from '@/app/types'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BookingListProps {
  bookings: BookingRequest[]
  onStatusChange: (bookingId: string, newStatus: string) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function BookingList({ bookings, onStatusChange, currentPage, totalPages, onPageChange }: BookingListProps) {
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onClick={() => setSelectedBooking(booking)}
          />
        ))}
      </div>
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onStatusChange={onStatusChange}
        />
      )}
      <div className="flex items-center justify-between mt-4">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

