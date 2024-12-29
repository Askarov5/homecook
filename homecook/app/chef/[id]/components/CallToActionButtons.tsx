"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Bell, BellOff } from 'lucide-react'

interface CallToActionButtonsProps {
  isSubscribed: boolean;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
}

export function CallToActionButtons({ isSubscribed, onSubscribe, onUnsubscribe }: CallToActionButtonsProps) {
  const handleSubscribe = () => {
    if (isSubscribed) {
      onUnsubscribe()
    } else {
      onSubscribe()
    }
  }

  const handleContactChef = () => {
    // Implement contact chef logic
    console.log("Contacting chef")
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <Button
        onClick={handleSubscribe}
        className={isSubscribed ? "bg-orange-200 text-orange-800" : "bg-orange-500 hover:bg-orange-600 text-white"}
      >
        {isSubscribed ? (
          <>
            <BellOff className="mr-2 h-4 w-4" />
            Unsubscribe
          </>
        ) : (
          <>
            <Bell className="mr-2 h-4 w-4" />
            Subscribe
          </>
        )}
      </Button>
      <Button 
        variant="outline" 
        onClick={() => {
          // Implement contact chef logic here
          console.log('Contact chef clicked');
          // You might want to open a modal or redirect to a contact form
        }} 
        className="text-green-600 border-green-600 hover:bg-green-50"
      >
        Contact Chef
      </Button>
    </div>
  )
}

