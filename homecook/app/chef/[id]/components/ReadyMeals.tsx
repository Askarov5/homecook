import Image from 'next/image'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MenuItem } from '@/app/types'

interface ReadyMealsProps {
  meals: MenuItem[]
  onAddToOrder: (item: MenuItem, quantity: number) => void
}

export function ReadyMeals({ meals, onAddToOrder }: ReadyMealsProps) {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

  const handleQuantityChange = (id: number, value: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(value, 1) }))
  }

  const handleAddToOrder = (meal: MenuItem) => {
    const quantity = quantities[meal.id] || 1
    onAddToOrder(meal, quantity)
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-green-800">Ready Meals of the Day</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <Image
              src={meal.image}
              alt={meal.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-green-700">{meal.name}</h3>
                <div className="text-right">
                  {meal.discount ? (
                    <>
                      <span className="text-lg font-bold text-red-500">${(meal.price * (1 - meal.discount / 100)).toFixed(2)}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">${meal.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-orange-500">${meal.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 mb-4">{meal.description}</p>
              <div className="flex flex-col">
                <span className="text-orange-500 font-semibold mb-2">
                  {meal.minPortions} portions left
                </span>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min={1}
                    max={meal.minPortions}
                    value={quantities[meal.id] || 1}
                    onChange={(e) => handleQuantityChange(meal.id, parseInt(e.target.value))}
                    className="w-20"
                  />
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600 text-white flex-grow"
                    onClick={() => handleAddToOrder(meal)}
                  >
                    Add to Order
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

