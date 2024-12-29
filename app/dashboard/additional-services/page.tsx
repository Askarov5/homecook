'use client'

import { useState } from 'react'
import { AdditionalServices } from './components/AdditionalServices'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chef } from '@/app/types'

export default function AdditionalServicesPage() {
  const [chef, setChef] = useState<Chef>({
    id: 1,
    name: 'Alice Johnson',
    image: '/placeholder.svg?height=100&width=100',
    additionalServices: [],
    email: 'alice@example.com',
    phone: '123-456-7890',
    bio: 'Experienced chef specializing in Italian cuisine.',
    rating: 5,
    reviews: 120,
    customerReviews: [],
    location: 'Unknown',
    minPreorderDays: 0,
    portfolio: [],
    menu: [],
    readyMeals: [],
    socialMedia: {
        instagram: 'chefalicej',
        facebook: 'chefalicej',
        twitter: 'chefalicej'
    },
    cuisines: [],
    isDeliveryAvailable: false,
    deliveryConditions: '',
    cateringServices: '',
  });

  const handleUpdateChef = (updatedChef: Chef) => {
    // In a real application, you would update the chef data in your backend
    setChef(updatedChef);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Additional Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Welcome to the Additional Services page! Here, you can manage the extra services you offer to your customers beyond your regular menu items. These could include catering, cooking classes, meal prep services, or any other culinary experiences you'd like to provide. Use this page to add, edit, or remove services, set pricing, and specify availability. Offering additional services can help you diversify your business and attract more customers.
            </p>
          </CardContent>
        </Card>
        <AdditionalServices chef={chef} onUpdateChef={handleUpdateChef} />
      </div>
    </div>
  );
}

