import React, { useState } from 'react';
import { ShoppingBag, ChefHat, Clock, DollarSign, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export type OrderStatus = 'received' | 'in_progress' | 'ready' | 'paid' | 'completed' | 'cancelled';

interface OrderStatusTimelineProps {
  currentStatus: OrderStatus;
  onStatusUpdate: (newStatus: OrderStatus, cancellationReason?: string) => void;
  cancelledAt?: OrderStatus;
  cancellationReason?: string;
}

const statusConfig = {
  received: { icon: ShoppingBag, label: 'Order Received', color: 'bg-gray-200 text-gray-600' },
  in_progress: { icon: ChefHat, label: 'Order in Progress', color: 'bg-yellow-200 text-yellow-600' },
  ready: { icon: Clock, label: 'Order Ready to Pickup', color: 'bg-blue-200 text-blue-600' },
  paid: { icon: DollarSign, label: 'Order Paid', color: 'bg-green-200 text-green-600' },
  completed: { icon: CheckCircle, label: 'Order Completed', color: 'bg-green-600 text-white' },
  cancelled: { icon: XCircle, label: 'Cancelled', color: 'bg-red-200 text-red-600' },
};

const orderStatuses: OrderStatus[] = ['received', 'in_progress', 'ready', 'paid', 'completed'];

export function OrderStatusTimeline({ currentStatus, onStatusUpdate }: OrderStatusTimelineProps) {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
  const activeIndex = orderStatuses.indexOf(currentStatus);

  const handleCancelOrder = () => {
    onStatusUpdate('cancelled', cancellationReason);
    setIsCancelDialogOpen(false);
    setCancellationReason('');
  };

  return (
    <div className="w-full p-4">
      <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded">
        <h3 className="font-bold flex items-center">
          <AlertCircle className="mr-2" />
          How to Update Order Status
        </h3>
        <p className="mt-2">
          Click on a status icon to update the order to that status. You can only move forward in the process or cancel the order. 
          Cancelling an order requires a reason. The &apos;Paid&apos; status will automatically update the payment status.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        {orderStatuses.map((status, index) => {
          const config = statusConfig[status];
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          const isCurrent = status === currentStatus;

          return (
            <div key={status} className="flex flex-col items-center mb-4 md:mb-0 relative w-full md:w-auto">
              <Button
                variant="ghost"
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                  isActive || isPast ? config.color : "bg-gray-100 text-gray-400",
                  currentStatus === 'cancelled' && "opacity-50"
                )}
                onClick={() => onStatusUpdate(status)}
                disabled={currentStatus === 'cancelled' || index > activeIndex + 1}
                title={`Update status to ${config.label}`}
              >
                <config.icon className="w-6 h-6" />
              </Button>
              <div className="text-sm font-medium text-center">{config.label}</div>
              {index < orderStatuses.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gray-200 -z-10">
                  <div 
                    className={cn(
                      "h-full bg-green-500 transition-all duration-500",
                      isPast ? "w-full" : "w-0"
                    )}
                  />
                </div>
              )}
              {isCurrent && currentStatus !== 'cancelled' && (
                <div className="mt-2 text-xs text-green-600 font-semibold">Current Status</div>
              )}
            </div>
          );
        })}
      </div>
      {currentStatus !== 'cancelled' && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="destructive"
            onClick={() => setIsCancelDialogOpen(true)}
          >
            Cancel Order
          </Button>
        </div>
      )}
      {currentStatus === 'cancelled' && (
        <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 mr-2" />
            <span className="font-semibold">Order Cancelled</span>
          </div>
        </div>
      )}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Order</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Please provide a reason for cancellation"
            value={cancellationReason}
            onChange={(e) => setCancellationReason(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleCancelOrder} disabled={!cancellationReason.trim()}>
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

