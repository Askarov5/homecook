import { BookingRequest } from '@/app/types'

export function generateMockBookings(count: number): BookingRequest[] {
  const serviceTypes = ['Catering', 'Private Events', 'Cooking Lessons']
  const eventTypes = ['Wedding', 'Birthday', 'Corporate', 'Anniversary', 'Other']
  const statuses: BookingRequest['status'][] = ['New', 'In Progress', 'Completed', 'Denied', 'Approved']

  return Array.from({ length: count }, (_, i) => ({
    id: `booking-${i + 1}`,
    serviceType: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
    userName: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    phone: `+1${Math.floor(Math.random() * 1000000000).toString().padStart(10, '0')}`,
    eventType: eventTypes[Math.floor(Math.random() * eventTypes.length)],
    guestCount: Math.floor(Math.random() * 100) + 10,
    eventDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
    details: `This is a mock booking request for ${serviceTypes[Math.floor(Math.random() * serviceTypes.length)]}.`,
    requestDate: new Date(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }))
}
