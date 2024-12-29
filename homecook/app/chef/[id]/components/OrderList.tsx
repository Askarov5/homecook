import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from 'lucide-react'
import { OrderItem } from '@/app/types'
import { format, isValid, addDays } from 'date-fns'
import { DateTimePicker } from "@/components/ui/date-time-picker"

interface OrderListProps {
  items: OrderItem[]
  onRemoveItem: (id: number) => void
  onUpdateItem: (id: number, updates: Partial<OrderItem>) => void
  minPreorderDays: number
}

export function OrderList({ items, onRemoveItem, onUpdateItem, minPreorderDays }: OrderListProps) {
  const [editingItem, setEditingItem] = useState<OrderItem | null>(null)
  const [estimatedReadyDateTime, setEstimatedReadyDateTime] = useState<Date>(addDays(new Date(), minPreorderDays))

  const handleEditItem = (item: OrderItem) => {
    setEditingItem(item)
  }

  const handleUpdateItem = () => {
    if (editingItem) {
      onUpdateItem(editingItem.id, editingItem)
      setEditingItem(null)
    }
  }

  const handleIngredientToggle = (ingredient: string) => {
    if (editingItem) {
      const updatedRemovedIngredients = editingItem.removedIngredients || []
      const index = updatedRemovedIngredients.indexOf(ingredient)
      if (index > -1) {
        updatedRemovedIngredients.splice(index, 1)
      } else {
        updatedRemovedIngredients.push(ingredient)
      }
      setEditingItem({ ...editingItem, removedIngredients: updatedRemovedIngredients })
    }
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleDateTimeChange = (date: Date | null) => {
    if (date && isValid(date)) {
      const minDate = addDays(new Date(), minPreorderDays);
      setEstimatedReadyDateTime(date < minDate ? minDate : date);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-green-800">Your Order</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">Your order list is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-4">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-gray-600 ml-2">x{item.quantity}</span>
                  {item.removedIngredients && item.removedIngredients.length > 0 && (
                    <div className="text-sm text-gray-500">
                      Without: {item.removedIngredients.join(', ')}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => onRemoveItem(item.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right mb-4">
            <span className="font-semibold text-lg">Total: ${totalPrice.toFixed(2)}</span>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Estimated Ready Date and Time</h3>
            <div className="flex items-center space-x-2">
              <DateTimePicker
                value={estimatedReadyDateTime}
                onChange={handleDateTimeChange}
                minDate={addDays(new Date(), minPreorderDays)}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              (Minimum {minPreorderDays} days pre-order)
            </p>
          </div>
        </>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">Proceed to Checkout</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>
          <p>Implement checkout process here.</p>
        </DialogContent>
      </Dialog>

      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Order Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min={editingItem.minPortions}
                  value={editingItem.quantity}
                  onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700">
                  Dietary Restrictions
                </label>
                <Textarea
                  id="dietaryRestrictions"
                  value={editingItem.dietaryRestrictions || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, dietaryRestrictions: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Remove Ingredients</label>
                <div className="mt-2 space-y-2">
                  {editingItem.ingredients.map((ingredient) => (
                    <div key={ingredient} className="flex items-center">
                      <Checkbox
                        id={`remove-${ingredient}`}
                        checked={(editingItem.removedIngredients || []).includes(ingredient)}
                        onCheckedChange={() => handleIngredientToggle(ingredient)}
                      />
                      <label htmlFor={`remove-${ingredient}`} className="ml-2 text-sm text-gray-600">
                        {ingredient}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={handleUpdateItem}>Update Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

