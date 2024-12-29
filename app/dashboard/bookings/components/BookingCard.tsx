import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookingRequest } from '@/app/types'
import { formatDateTime } from '@/lib/utils'

interface BookingCardProps {
  booking: BookingRequest
  onClick: () => void
}

export function BookingCard({ booking, onClick }: BookingCardProps) {
  return (
    <Card className="cursor-pointer bg-white hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{booking.serviceType}</span>
          <Badge variant={getStatusVariant(booking.status)}>{booking.status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold">{booking.userName}</p>
        <p className="text-sm text-gray-500">{booking.email}</p>
        <p className="text-sm text-gray-500">{booking.phone}</p>
        <p className="mt-2 text-sm">{truncate(booking.details, 100)}</p>
        <p className="mt-2 text-xs text-gray-400">Requested on: {formatDateTime(booking.requestDate)}</p>
      </CardContent>
    </Card>
  )
}

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case 'Completed':
      return 'default'
    case 'Approved':
    case 'In Progress':
      return 'secondary'
    case 'Denied':
      return 'destructive'
    default:
      return 'outline'
  }
}

function truncate(str: string, length: number) {
  return str.length > length ? str.substring(0, length - 3) + '...' : str
}

