import Image from 'next/image'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users } from 'lucide-react'
import { MenuItem } from '@/app/types'

interface MenuProps {
  menu: MenuItem[]
  onAddToOrder: (item: MenuItem, quantity: number) => void
}

const categoryDescriptions: { [key: string]: string } = {
  Meals: "Full-course dishes such as lunch, dinner, or specific meal combos.",
  Baking: "Breads, cookies, pastries, or other baked goods.",
  Desserts: "Sweets such as cakes, puddings, ice creams, or pies.",
  Drinks: "Beverages including cocktails, smoothies, or specialty coffees.",
}

export function Menu({ menu, onAddToOrder }: MenuProps) {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

  const handleQuantityChange = (id: number, value: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(value, menu.find(item => item.id === id)?.minPortions || 1) }))
  }

  const handleAddToOrder = (item: MenuItem) => {
    const quantity = quantities[item.id] || item.minPortions
    onAddToOrder(item, quantity)
  }

  const groupedMenu = menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as { [key: string]: MenuItem[] })

  const categories = Object.keys(groupedMenu)

  return (
    <section className="mb-12" id="menu">
      <h2 className="text-2xl font-semibold mb-4 text-green-800">Menu</h2>
      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="text-lg">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="mb-4">
              <p className="text-gray-600">{categoryDescriptions[category] || ""}</p>
            </div>
            <div className="grid gap-6">
              {groupedMenu[category].map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex">
                  <div className="w-1/4 mr-6">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-green-700">{item.name}</h3>
                      <span className="text-lg font-bold text-orange-500">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-green-600 mb-2">Ingredients:</h4>
                      <div className="flex flex-wrap">
                        {item.ingredients.map((ingredient, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs mr-2 mb-2">
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-orange-400" />
                          <span>{item.prepTime} mins</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-orange-400" />
                          <span>Min. {item.minPortions} portions</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          min={item.minPortions}
                          value={quantities[item.id] || item.minPortions}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          className="w-20"
                        />
                        <Button 
                          variant="outline" 
                          className="text-green-600 border-green-600 hover:bg-green-50"
                          onClick={() => handleAddToOrder(item)}
                        >
                          Add to Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

