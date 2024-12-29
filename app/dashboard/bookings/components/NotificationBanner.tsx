import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { BookingRequest } from '@/app/types'

interface NotificationBannerProps {
  bookings: BookingRequest[]
}

export function NotificationBanner({ bookings }: NotificationBannerProps) {
  const newBookingsCount = bookings.filter(booking => booking.status === 'New').length

  if (newBookingsCount === 0) {
    return null
  }

  return (
    <Alert variant="default" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>New Booking Requests</AlertTitle>
      <AlertDescription>
        You have {newBookingsCount} new booking {newBookingsCount === 1 ? 'request' : 'requests'} to review.
      </AlertDescription>
    </Alert>
  )
}

