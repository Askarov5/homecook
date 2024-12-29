"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from 'lucide-react'
import { MenuOverview } from '../components/MenuOverview'
import { AddEditMenuItem } from '../components/AddEditMenuItem'
import { MenuItem } from '@/app/types/chef'

const initialMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    description: "Classic Roman pasta dish with eggs, cheese, and pancetta",
    image: "/placeholder.svg?height=100&width=100&text=Carbonara",
    category: "Meals",
    cuisineType: "Italian",
    price: 15.99,
    prepTime: 25,
    minPortions: 1,
    ingredients: ["Spaghetti", "Eggs", "Pecorino Romano", "Guanciale", "Black Pepper"],
    dietaryRestrictions: ["Contains eggs", "Contains dairy"],
    available: true,
    discount: 10,
    notes: "Can be made vegetarian upon request"
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Traditional Neapolitan pizza with tomatoes, mozzarella, and basil",
    image: "/placeholder.svg?height=100&width=100&text=Margherita",
    category: "Meals",
    cuisineType: "Italian",
    price: 12.99,
    prepTime: 20,
    minPortions: 1,
    ingredients: ["Pizza dough", "San Marzano tomatoes", "Fresh mozzarella", "Basil", "Olive oil"],
    dietaryRestrictions: ["Vegetarian", "Contains gluten", "Contains dairy"],
    available: false,
    notes: "Gluten-free option available"
  },
  {
    id: 3,
    name: "Tiramisu",
    description: "Classic Italian coffee-flavored dessert",
    image: "/placeholder.svg?height=100&width=100&text=Tiramisu",
    category: "Desserts",
    cuisineType: "Italian",
    price: 8.99,
    prepTime: 15,
    minPortions: 2,
    ingredients: ["Ladyfingers", "Mascarpone cheese", "Eggs", "Sugar", "Cocoa powder", "Coffee"],
    dietaryRestrictions: ["Contains eggs", "Contains dairy", "Contains gluten"],
    available: true,
    notes: "Contains alcohol (coffee liqueur)"
  }
]

export default function MenuPage() {
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)

  const handleAddItem = () => {
    setIsAddingItem(true)
    setEditingItem(null)
  }

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item)
    setIsAddingItem(false)
  }

  const handleCloseForm = () => {
    setIsAddingItem(false)
    setEditingItem(null)
  }

  const handleSaveItem = async (item: MenuItem, imageFile?: File) => {
    let imageUrl = item.image

    if (imageFile) {
      // In a real application, you would upload the image to your server or a cloud storage service
      // For this example, we'll use a placeholder URL
      imageUrl = URL.createObjectURL(imageFile)
    }

    const updatedItem = { ...item, image: imageUrl }

    if (editingItem) {
      setMenuItems(menuItems.map(i => i.id === editingItem.id ? updatedItem : i))
    } else {
      setMenuItems([...menuItems, { ...updatedItem, id: Date.now() }])
    }

    handleCloseForm()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Menu Management</h1>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Menu Overview</CardTitle>
              <Button onClick={handleAddItem}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <MenuOverview menuItems={menuItems} onEditItem={handleEditItem} />
          </CardContent>
        </Card>

        {(isAddingItem || editingItem) && (
          <Card>
            <CardHeader>
              <CardTitle>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</CardTitle>
            </CardHeader>
            <CardContent>
              <AddEditMenuItem
                item={editingItem || undefined}
                onClose={handleCloseForm}
                onSave={handleSaveItem}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

