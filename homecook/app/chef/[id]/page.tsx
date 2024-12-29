"use client"

import { useState, useEffect } from 'react'
import { Chef, MenuItem, OrderItem } from '@/app/types'
import { Header } from './components/Header'
import { PortfolioGallery } from './components/PortfolioGallery'
import { Menu } from './components/Menu'
import { ReadyMeals } from './components/ReadyMeals'
import { CateringServices } from './components/CateringServices'
import { CustomerReviews } from './components/CustomerReviews'
import { CallToActionButtons } from './components/CallToActionButtons'
import { OrderList } from './components/OrderList'
import { toast } from "@/hooks/use-toast"

// This is a placeholder. In a real application, you would fetch the chef data based on the ID.
const getChefData = async (id: string): Promise<Chef> => {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    email: "chef.alice@example.com",
    phone: "+1234567890",
    cuisines: ["Italian"],
    id: parseInt(id),
    name: "Chef Alice",
    image: "https://placehold.co/200x200.png?text=Chef+Alice",
    banner: "https://placehold.co/1200x400.png?text=Chef+Alice",
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
    portfolio: Array(10).fill("https://placehold.co/160x160.png?text=Portfolio"),
    menu: [
      { 
        id: 1, 
        name: "Spaghetti Carbonara", 
        description: "Classic Roman pasta dish", 
        price: 15, 
        prepTime: 30,
        minPortions: 2,
        ingredients: ["Spaghetti", "Eggs", "Pecorino Romano", "Guanciale", "Black Pepper"],
        image: "https://placehold.co/200x200.png?text=Carbonara",
        category: "Meals",
        available: true,
        cuisineType: "Italian",
        notes: ""
      },
      { 
        id: 2, 
        name: "Margherita Pizza", 
        description: "Traditional Neapolitan pizza", 
        price: 12, 
        prepTime: 20,
        minPortions: 1,
        ingredients: ["Pizza Dough", "San Marzano Tomatoes", "Fresh Mozzarella", "Basil", "Extra Virgin Olive Oil"],
        image: "https://placehold.co/200x200.png?text=Margherita",
        category: "Meals",
        available: true,
        cuisineType: "Italian",
        notes: ""
      },
      { 
        id: 3, 
        name: "Tiramisu", 
        description: "Italian coffee-flavored dessert", 
        price: 8, 
        prepTime: 15,
        minPortions: 2,
        ingredients: ["Ladyfingers", "Mascarpone", "Espresso", "Eggs", "Sugar", "Cocoa Powder"],
        image: "https://placehold.co/200x200.png?text=Tiramisu",
        category: "Desserts",
        available: true,
        cuisineType: "Italian",
        notes: ""
      },
      {
        id: 6,
        name: "Focaccia Bread",
        description: "Traditional Italian flatbread",
        price: 6,
        prepTime: 25,
        minPortions: 4,
        ingredients: ["Flour", "Olive Oil", "Rosemary", "Sea Salt"],
        image: "https://placehold.co/200x200.png?text=Focaccia",
        category: "Baking",
        available: true,
        cuisineType: "Italian",
        notes: ""
      },
      {
        id: 7,
        name: "Espresso Martini",
        description: "Coffee-flavored cocktail",
        price: 10,
        prepTime: 5,
        minPortions: 1,
        ingredients: ["Vodka", "Espresso", "Coffee Liqueur", "Simple Syrup"],
        image: "https://placehold.co/200x200.png?text=Espresso+Martini",
        category: "Drinks",
        available: true,
        cuisineType: "Italian",
        notes: ""
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
        image: "https://placehold.co/200x200.png?text=Lasagna",
        category: "Meals",
        discount: 15, // 15% discount
        available: true,
        cuisineType: "Italian",
        notes: ""
      },
      { 
        id: 5, 
        name: "Chicken Parmigiana", 
        description: "Breaded chicken with tomato sauce and mozzarella", 
        price: 16, 
        prepTime: 0,
        minPortions: 3,
        ingredients: ["Chicken Breast", "Breadcrumbs", "Tomato Sauce", "Mozzarella", "Parmesan"],
        image: "https://placehold.co/200x200.png?text=Chicken+Parm",
        category: "Meals",
        available: true,
        cuisineType: "Italian",
        notes: ""
      }
    ],
    cateringServices: "I offer catering services for events of up to 50 people. Minimum order of $300 required. Please contact me for custom menu options and pricing.",
    customerReviews: [
      { id: 1, customerName: "John D.", rating: 5, comment: "Absolutely delicious! Chef Alice's carbonara is the best I've ever had.", date: "2023-01-01" },
      { id: 2, customerName: "Sarah M.", rating: 4, comment: "Great food and service. Highly recommended for small gatherings.", date: "2023-01-02" },
      { id: 3, customerName: "Mike R.", rating: 5, comment: "The tiramisu was out of this world! Will definitely order again.", date: "2023-01-03" },
      { id: 4, customerName: "Emily L.", rating: 4, comment: "Loved the pizza. Authentic Italian taste right at home.", date: "2023-01-04" },
      { id: 5, customerName: "David K.", rating: 5, comment: "Chef Alice catered our family reunion and it was a huge hit!", date: "2023-01-05" }
    ],
    subscribed: false
  }
}

export default function ChefProfilePage({ params }: { params: { id: string } }) {
  const [chefData, setChefData] = useState<Chef | null>(null) // Update: Properly typed chefData
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    getChefData(params.id).then(chef => {
      setChefData(chef)
      setIsSubscribed(chef.subscribed || false)
    })
  }, [params.id]) // Update: No changes needed here as minPreorderDays is already included implicitly through chef object

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
    // In a real application, you would send this update to the server
  }

  const handleUnsubscribe = () => {
    setIsSubscribed(false)
    toast({
      title: "Unsubscribed",
      description: "You will no longer receive updates from this chef.",
    })
    // In a real application, you would send this update to the server
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
                minPreorderDays={chefData.minPreorderDays} // Update: Added minPreorderDays prop
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

