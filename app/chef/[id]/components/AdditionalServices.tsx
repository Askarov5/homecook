import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Chef, BookingRequest } from '@/app/types'
import { serviceDetails, serviceIcons } from '@/lib/serviceDetails'
import Link from 'next/link'
import { BookingModal } from './BookingModal'

interface AdditionalServicesProps {
  services: Chef['additionalServices']
  chefId: number
  onBookingSubmit: (booking: Omit<BookingRequest, 'id' | 'requestDate' | 'status'>) => void
}

export default function AdditionalServices({ services, chefId, onBookingSubmit }: AdditionalServicesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const availableServices = Object.entries(services)
    .filter(([_, value]) => value)
    .map(([key]) => key as keyof typeof serviceDetails)

  const handleBookNow = (serviceKey: string) => {
    setSelectedService(serviceKey)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-green-800">Additional Services</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {availableServices.map((serviceKey) => {
          const service = serviceDetails[serviceKey]
          const Icon = serviceIcons[serviceKey]
          return (
            <Card key={serviceKey} className="bg-white overflow-hidden transition-shadow hover:shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center text-xl text-green-700">
                  <Icon className="mr-2 h-6 w-6 text-orange-500" />
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4 text-gray-600">{service.description}</p>
                <ul className="list-disc list-inside text-sm text-gray-500 mb-4">
                  {service.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="mb-1">{detail}</li>
                  ))}
                </ul>
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Service Details:</h4>
                  <p className="text-sm text-gray-600"><strong>Conditions:</strong> {service.conditions}</p>
                  <p className="text-sm text-gray-600"><strong>Pricing:</strong> {service.pricing}</p>
                  <p className="text-sm text-gray-600"><strong>Availability:</strong> {service.availability}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="default"
                    onClick={() => handleBookNow(serviceKey)} className="flex-1">
                    Book Now
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <Link href={`/chef/${chefId}/contact?service=${serviceKey}`}>
                      Contact Chef
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        )}
      </div>
      {selectedService && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={onBookingSubmit}
          serviceType={serviceDetails[selectedService as keyof typeof serviceDetails].title}
        />
      )}
    </section>
  )
}

