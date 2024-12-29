import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { BookingRequest } from '@/app/types'
import { formatDateTime } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BookingDetailModalProps {
  booking: BookingRequest & { status: 'New' | 'Approved' | 'Denied' | 'In Progress' | 'Completed' }
  onClose: () => void
  onStatusChange: (bookingId: string, newStatus: string) => void
}

export function BookingDetailModal({ booking, onClose, onStatusChange }: BookingDetailModalProps) {

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Booking Request Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Service:</span>
            <span className="col-span-3">{booking.serviceType}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Status:</span>
            <Select
              value={booking.status}
              onValueChange={(value) => onStatusChange(booking.id, value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Update status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Denied">Denied</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Client:</span>
            <span className="col-span-3">{booking.userName}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Email:</span>
            <a href={`mailto:${booking.email}`} className="col-span-3 text-blue-600 hover:underline">{booking.email}</a>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Phone:</span>
            <a href={`tel:${booking.phone}`} className="col-span-3 text-blue-600 hover:underline">{booking.phone}</a>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Event Type:</span>
            <span className="col-span-3">{booking.eventType}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Guests:</span>
            <span className="col-span-3">{booking.guestCount}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Date:</span>
            <span className="col-span-3">{formatDateTime(booking.eventDate)}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Details:</span>
            <span className="col-span-3">{booking.details}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

