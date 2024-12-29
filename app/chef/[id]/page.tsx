"use client"

import { useState, useEffect } from 'react'
import { Chef, MenuItem, BookingRequest } from '@/app/types'
import { Header } from './components/Header'
import { PortfolioGallery } from './components/PortfolioGallery'
import { Menu } from './components/Menu'
import { ReadyMeals } from './components/ReadyMeals'
import { CateringServices } from './components/CateringServices'
import { CustomerReviews } from './components/CustomerReviews'
import { CallToActionButtons } from './components/CallToActionButtons'
import { OrderList } from './components/OrderList'
import { OrderItem } from '@/app/types'
import { toast } from "@/hooks/use-toast"
import AdditionalServices from './components/AdditionalServices'

// This is a placeholder. In a real application, you would fetch the chef data based on the ID.
const getChefData = async (id: string): Promise<Chef> => {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    id: parseInt(id),
    name: "Chef Alice",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Passionate about creating delicious Italian dishes with a modern twist.",
    rating: 4.8,
    reviews: 120,
    location: "Brooklyn, NY 11201",
    minPreorderDays: 2,
    socialMedia: {
      instagram: "chef_alice",
      whatsapp: "+1234567890",
      telegram: "@chef_alice"
    },
    portfolio: Array(10).fill("/placeholder.svg?height=160&width=160"),
    menu: [
      {
        id: 1,
        name: "Spaghetti Carbonara",
        description: "Classic Roman pasta dish",
        price: 15,
        prepTime: 30,
        minPortions: 2,
        ingredients: ["Spaghetti", "Eggs", "Pecorino Romano", "Guanciale", "Black Pepper"],
        image: "/placeholder.svg?height=200&width=200&text=Carbonara",
        category: "Meals",
        available: false,
        cuisineType: '',
        notes: ''
      },
      {
        id: 2,
        name: "Margherita Pizza",
        description: "Traditional Neapolitan pizza",
        price: 12,
        prepTime: 20,
        minPortions: 1,
        ingredients: ["Pizza Dough", "San Marzano Tomatoes", "Fresh Mozzarella", "Basil", "Extra Virgin Olive Oil"],
        image: "/placeholder.svg?height=200&width=200&text=Margherita",
        category: "Meals",
        available: false,
        cuisineType: '',
        notes: ''
      },
      {
        id: 3,
        name: "Tiramisu",
        description: "Italian coffee-flavored dessert",
        price: 8,
        prepTime: 15,
        minPortions: 2,
        ingredients: ["Ladyfingers", "Mascarpone", "Espresso", "Eggs", "Sugar", "Cocoa Powder"],
        image: "/placeholder.svg?height=200&width=200&text=Tiramisu",
        category: "Desserts",
        available: false,
        cuisineType: '',
        notes: ''
      },
      {
        id: 6,
        name: "Focaccia Bread",
        description: "Traditional Italian flatbread",
        price: 6,
        prepTime: 25,
        minPortions: 4,
        ingredients: ["Flour", "Olive Oil", "Rosemary", "Sea Salt"],
        image: "/placeholder.svg?height=200&width=200&text=Focaccia",
        category: "Baking",
        available: false,
        cuisineType: '',
        notes: ''
      },
      {
        id: 7,
        name: "Espresso Martini",
        description: "Coffee-flavored cocktail",
        price: 10,
        prepTime: 5,
        minPortions: 1,
        ingredients: ["Vodka", "Espresso", "Coffee Liqueur", "Simple Syrup"],
        image: "/placeholder.svg?height=200&width=200&text=Espresso+Martini",
        category: "Drinks",
        available: false,
        cuisineType: '',
        notes: ''
      }
    ],
    readyMeals: [
      {
        id: 4,
        name: "Lasagna",
        description: "Homemade beef lasagna",
        price: 18,
        prepTime: 0,
        minPortions: 5,
        ingredients: ["Pasta Sheets", "Ground Beef", "Tomato Sauce", "Bechamel", "Mozzarella"],
        image: "/placeholder.svg?height=200&width=200&text=Lasagna",
        category: "Meals",
        discount: 15 // 15% discount
        ,
        available: false,
        cuisineType: '',
        notes: ''
      },
      {
        id: 5,
        name: "Chicken Parmigiana",
        description: "Breaded chicken with tomato sauce and mozzarella",
        price: 16,
        prepTime: 0,
        minPortions: 3,
        ingredients: ["Chicken Breast", "Breadcrumbs", "Tomato Sauce", "Mozzarella", "Parmesan"],
        image: "/placeholder.svg?height=200&width=200&text=Chicken+Parm",
        category: "Meals",
        available: false,
        cuisineType: '',
        notes: ''
      }
    ],
    cateringServices: "I offer catering services for events of up to 50 people. Minimum order of $300 required. Please contact me for custom menu options and pricing.",
    customerReviews: [
      {
        id: 1, customerName: "John D.", rating: 5, comment: "Absolutely delicious! Chef Alice's carbonara is the best I've ever had.",
        date: ''
      },
      {
        id: 2, customerName: "Sarah M.", rating: 4, comment: "Great food and service. Highly recommended for small gatherings.",
        date: ''
      },
      {
        id: 3, customerName: "Mike R.", rating: 5, comment: "The tiramisu was out of this world! Will definitely order again.",
        date: ''
      },
      {
        id: 4, customerName: "Emily L.", rating: 4, comment: "Loved the pizza. Authentic Italian taste right at home.",
        date: ''
      },
      {
        id: 5, customerName: "David K.", rating: 5, comment: "Chef Alice catered our family reunion and it was a huge hit!",
        date: ''
      }
    ],
    subscribed: false,
    additionalServices: [{
      inHomeCooking: true,
      privateEvents: true,
      cookingLessons: false,
      dietaryPlanning: true,
      groceryShopping: false,
    }],
  }
}
// Removed local OrderItem interface to use the imported one

export default function ChefProfilePage({ params }: { params: { id: string } }) {
  const [chefData, setChefData] = useState<Chef | null>(null) 
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    getChefData(params.id).then(chef => {
      setChefData(chef)
      setIsSubscribed(chef.subscribed || false)
    })
  }, [params.id]) 

  const handleAddToOrder = (item: MenuItem, quantity: number) => {
    setOrderItems(prevItems => [
      ...prevItems,
      { ...item, quantity, removedIngredients: [] }
    ])
  }

  const handleRemoveItem = (id: number) => {
    setOrderItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const handleUpdateItem = (id: number, updates: Partial<OrderItem>) => {
    setOrderItems(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }

  const handleSubscribe = () => {
    setIsSubscribed(true)
    toast({
      title: "Subscribed!",
      description: "You will now receive updates from this chef.",
    })
  }

  const handleUnsubscribe = () => {
    setIsSubscribed(false)
    toast({
      title: "Unsubscribed",
      description: "You will no longer receive updates from this chef.",
    })
  }

  const handleBookingSubmit = (booking: Omit<BookingRequest, 'id' | 'requestDate' | 'status'>) => {
    // In a real application, this would send the booking to an API
    console.log('New booking:', booking)
    toast({
      title: "Booking Submitted",
      description: "Your booking request has been sent to the chef.",
    })
  }

  if (!chefData) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-beige-50">
      <main className="container mx-auto px-4 py-8">
        <Header chef={chefData} />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <PortfolioGallery images={chefData.portfolio} />
            <Menu menu={chefData.menu} onAddToOrder={handleAddToOrder} />
            <ReadyMeals meals={chefData.readyMeals} onAddToOrder={handleAddToOrder} />
            <CateringServices description={chefData.cateringServices} />
            <AdditionalServices 
              services={chefData.additionalServices} 
              chefId={chefData.id} 
              onBookingSubmit={handleBookingSubmit}
            />
            <CustomerReviews reviews={chefData.customerReviews} />
          </div>
          <div className="w-full md:w-1/3">
            <div className="sticky top-24">
              <CallToActionButtons
                isSubscribed={isSubscribed}
                onSubscribe={handleSubscribe}
                onUnsubscribe={handleUnsubscribe}
              />
              <OrderList 
                items={orderItems}
                onRemoveItem={handleRemoveItem}
                onUpdateItem={handleUpdateItem}
                minPreorderDays={chefData.minPreorderDays} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

