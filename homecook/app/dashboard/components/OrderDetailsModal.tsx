import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Order } from '@/app/types'
import { Clock, DollarSign, MapPin, User, AlertCircle } from 'lucide-react'
import { OrderStatusTimeline, OrderStatus } from '@/app/components/OrderStatusTimeline'
import { format, isValid, addDays } from 'date-fns';
import { DateTimePicker } from "@/components/ui/date-time-picker"

interface OrderDetailsModalProps {
  order: Order
  onClose: () => void
  onUpdateStatus: (orderId: string, newStatus: OrderStatus, cancellationReason?: string) => void
  onUpdateEstimatedReadyDateTime: (orderId: string, newDateTime: Date) => void
}

export function OrderDetailsModal({ order, onClose, onUpdateStatus, onUpdateEstimatedReadyDateTime }: OrderDetailsModalProps) {
  const handleStatusUpdate = (newStatus: OrderStatus, cancellationReason?: string) => {
    onUpdateStatus(order.id, newStatus, cancellationReason);
  }

  const handleDateTimeChange = (newDateTime: Date | null) => {
    if (newDateTime && isValid(newDateTime)) {
      onUpdateEstimatedReadyDateTime(order.id, newDateTime);
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Order #{order.id}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{order.customerName}</h3>
                <p className="text-sm text-gray-500 flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {format(order.orderDate, 'PPp')}
                </p>
              </div>
            </div>

            <OrderStatusTimeline 
              currentStatus={order.status}
              onStatusUpdate={(newStatus, cancellationReason) => handleStatusUpdate(newStatus, cancellationReason)}
            />

            <div>
              <h4 className="font-semibold text-lg mb-2">Order Items</h4>
              <ul className="space-y-4">
                {order.items.map((item, index) => (
                  <li key={index} className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.quantity}x {item.name}</span>
                      <span className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    {item.removedIngredients && item.removedIngredients.length > 0 && (
                      <div className="mt-2 text-sm text-red-500">
                        <span className="font-medium">Removed: </span>
                        {item.removedIngredients.join(', ')}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-lg mb-2">Estimated Ready Date and Time</h4>
              <DateTimePicker
                value={order.estimatedReadyDateTime}
                onChange={handleDateTimeChange}
                minDate={addDays(order.orderDate, 2)}
              />
            </div>

            {order.dietaryComments && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="font-semibold">Dietary Comments:</span>
                </div>
                <p className="mt-1 text-sm">{order.dietaryComments}</p>
              </div>
            )}

            <Separator />

            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Total:</span>
              <span className="font-bold text-xl text-green-600">${order.totalPrice.toFixed(2)}</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Payment Status:</span>
                <Badge variant={order.paymentStatus === 'Paid' ? 'default' : 'destructive'}>
                  {order.paymentStatus}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-semibold text-lg">Delivery Information</h4>
              <p className="flex items-center text-gray-600">
                <MapPin className="mr-2 h-4 w-4" />
                123 Main St, Anytown, AN 12345
              </p>
              <p className="flex items-center text-gray-600">
                <DollarSign className="mr-2 h-4 w-4" />
                Payment Method: Credit Card
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

