import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function PortfolioManagement() {
  const [portfolioItems, setPortfolioItems] = useState([
    '/placeholder.svg?height=200&width=200&text=Dish+1',
    '/placeholder.svg?height=200&width=200&text=Dish+2',
    '/placeholder.svg?height=200&width=200&text=Dish+3',
  ])
  const [specialties, setSpecialties] = useState(['Italian Cuisine', 'Pasta', 'Seafood'])

  const handleAddPortfolioItem = () => {
    // In a real app, you'd open a file picker and upload the image
    setPortfolioItems([...portfolioItems, `/placeholder.svg?height=200&width=200&text=New+Dish`])
  }

  const handleRemovePortfolioItem = (index: number) => {
    setPortfolioItems(portfolioItems.filter((_, i) => i !== index))
  }

  const handleAddSpecialty = () => {
    setSpecialties([...specialties, ''])
  }

  const handleSpecialtyChange = (index: number, value: string) => {
    const newSpecialties = [...specialties]
    newSpecialties[index] = value
    setSpecialties(newSpecialties)
  }

  const handleRemoveSpecialty = (index: number) => {
    setSpecialties(specialties.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Portfolio Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolioItems.map((item, index) => (
                <div key={index} className="relative">
                  <Image
                    src={item}
                    alt={`Portfolio item ${index + 1}`}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemovePortfolioItem(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                className="h-[200px] w-full"
                onClick={handleAddPortfolioItem}
              >
                Add New Image
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Specialties</h3>
            <div className="space-y-2">
              {specialties.map((specialty, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={specialty}
                    onChange={(e) => handleSpecialtyChange(index, e.target.value)}
                    placeholder="Enter a specialty"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemoveSpecialty(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button onClick={handleAddSpecialty}>Add Specialty</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

