import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { MenuItem } from '@/app/types'
import { Trash2, Upload } from 'lucide-react'

interface AddEditMenuItemProps {
  item?: MenuItem
  onClose: () => void
  onSave: (item: MenuItem, imageFile?: File) => void
}

const defaultItem: MenuItem = {
  id: 0,
  name: '',
  description: '',
  image: '',
  category: '',
  cuisineType: '',
  price: 0,
  prepTime: 0,
  minPortions: 1,
  ingredients: [],
  dietaryRestrictions: [],
  available: false,
  notes: '',
}

export function AddEditMenuItem({ item, onClose, onSave }: AddEditMenuItemProps) {
  const [formData, setFormData] = useState<MenuItem>(item || defaultItem)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [newIngredient, setNewIngredient] = useState('')

  useEffect(() => {
    if (item) {
      setFormData(item)
      setImagePreview(item.image)
    }
  }, [item])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()]
      }))
      setNewIngredient('')
    }
  }

  const handleRemoveIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData, imageFile || undefined)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="relative w-40 h-40 bg-gray-100 rounded-lg overflow-hidden">
            {imagePreview ? (
              <Image src={imagePreview} alt="Meal preview" layout="fill" objectFit="cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                <Upload size={40} />
              </div>
            )}
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Dish Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={handleSelectChange('category')}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Meals">Meals</SelectItem>
                <SelectItem value="Desserts">Desserts</SelectItem>
                <SelectItem value="Baking">Baking</SelectItem>
                <SelectItem value="Drinks">Drinks</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cuisineType">Cuisine Type</Label>
            <Select value={formData.cuisineType} onValueChange={handleSelectChange('cuisineType')}>
              <SelectTrigger id="cuisineType">
                <SelectValue placeholder="Select cuisine type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Italian">Italian</SelectItem>
                <SelectItem value="Indian">Indian</SelectItem>
                <SelectItem value="Chinese">Chinese</SelectItem>
                <SelectItem value="Mexican">Mexican</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input 
              id="price" 
              name="price" 
              type="number" 
              min="0" 
              step="0.01" 
              value={formData.price} 
              onChange={handleNumberInputChange} 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minPortions">Minimum Order Quantity</Label>
            <Input 
              id="minPortions" 
              name="minPortions" 
              type="number" 
              min="1" 
              value={formData.minPortions} 
              onChange={handleNumberInputChange} 
              required 
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ingredients">Ingredients</Label>
          <div className="flex space-x-2">
            <Input 
              id="newIngredient" 
              value={newIngredient} 
              onChange={(e) => setNewIngredient(e.target.value)} 
              placeholder="Add an ingredient" 
            />
            <Button type="button" onClick={handleAddIngredient}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded">
                <span>{ingredient}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-2 p-0 h-auto"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dietaryRestrictions">Dietary Restrictions/Allergens</Label>
          <Input 
            id="dietaryRestrictions" 
            name="dietaryRestrictions" 
            value={formData.dietaryRestrictions?.join(', ')} 
            onChange={(e) => setFormData(prev => ({ ...prev, dietaryRestrictions: e.target.value.split(',').map(item => item.trim()) }))} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="available" checked={formData.available} onCheckedChange={handleSwitchChange('available')} />
            <Label htmlFor="available">Available today</Label>
          </div>
          {formData.available && (
            <div className="flex items-center space-x-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                name="discount"
                type="number"
                min="0"
                max="100"
                value={formData.discount || ''}
                onChange={handleNumberInputChange}
                className="w-20"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}

