"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bell, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string;
  type: 'order' | 'review' | 'response';
  message: string;
  link: string;
  isRead: boolean;
}

export function NotificationComponent() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // In a real app, you'd fetch notifications from an API
    const mockNotifications: Notification[] = [
      { id: '1', type: 'order', message: 'New order received', link: '/dashboard/orders', isRead: false },
      { id: '2', type: 'review', message: 'New review posted', link: '/dashboard/reviews', isRead: false },
      { id: '3', type: 'response', message: 'Chef responded to your message', link: '/dashboard/messages', isRead: true },
    ]
    setNotifications(mockNotifications)
    updateUnreadCount(mockNotifications)
  }, [])

  const updateUnreadCount = (notifs: Notification[]) => {
    setUnreadCount(notifs.filter(n => !n.isRead).length)
  }

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(n =>
      n.id === id ? { ...n, isRead: true } : n
    )
    setNotifications(updatedNotifications)
    updateUnreadCount(updatedNotifications)
  }

  const removeNotification = (id: string) => {
    const updatedNotifications = notifications.filter(n => n.id !== id)
    setNotifications(updatedNotifications)
    updateUnreadCount(updatedNotifications)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h3 className="font-semibold mb-2">Notifications</h3>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500">No notifications</p>
          ) : (
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li key={notification.id} className="flex items-start justify-between p-2 bg-gray-50 rounded">
                  <Link
                    href={notification.link}
                    className={`flex-grow ${notification.isRead ? 'text-gray-600' : 'font-semibold'}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    {notification.message}
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 ml-2"
                    onClick={() => removeNotification(notification.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

