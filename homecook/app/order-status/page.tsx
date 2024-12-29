"use client"

import React, { useState } from 'react'
import { OrderStatusTimeline, OrderStatus } from '../components/OrderStatusTimeline'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OrderStatusPage() {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('received')
  const [isCancelled, setIsCancelled] = useState(false)
  const [cancelledAt, setCancelledAt] = useState<OrderStatus | undefined>(undefined)

  const handleStatusChange = (status: OrderStatus) => {
    setCurrentStatus(status)
    setIsCancelled(false)
    setCancelledAt(undefined)
  }

  const handleCancel = () => {
    setIsCancelled(true)
    setCancelledAt(currentStatus)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Status Timeline</h1>
      <OrderStatusTimeline 
        currentStatus={currentStatus}
        cancelledAt={cancelledAt}
        cancellationReason={isCancelled ? "Order was cancelled by the customer." : undefined} onStatusUpdate={() => {
          throw new Error('Function not implemented.')
        }}      />
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Select onValueChange={(value) => handleStatusChange(value as OrderStatus)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Change status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="received">Order Received</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="ready">Ready to Pickup</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleCancel} variant="destructive" disabled={isCancelled}>
          Cancel Order
        </Button>
      </div>
    </div>
  )
}

