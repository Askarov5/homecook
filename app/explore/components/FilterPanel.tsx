"use client"

import { useState, useEffect } from 'react'
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FilterPanelProps {
  onFilterChange: (filters: any) => void
}

export function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [rating, setRating] = useState<string[]>([])
  const [availability, setAvailability] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [cuisines, setCuisines] = useState<string[]>([])

  useEffect(() => {
    onFilterChange({
      priceRange,
      rating,
      availability,
      features,
      categories,
      cuisines
    })
  }, [priceRange, rating, availability, features, categories, cuisines, onFilterChange])

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="price">
        <AccordionTrigger>Price Range</AccordionTrigger>
        <AccordionContent>
          <Slider
            defaultValue={[0, 100]}
            max={100}
            step={1}
            onValueChange={setPriceRange}
            className="mt-2"
          />
          <div className="flex justify-between mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="rating">
        <AccordionTrigger>Rating</AccordionTrigger>
        <AccordionContent>
          {['5', '4', '3', '2', '1'].map((star) => (
            <div key={star} className="flex items-center mb-2">
              <Checkbox
                id={`rating-${star}`}
                checked={rating.includes(star)}
                onCheckedChange={(checked) => {
                  setRating(prev => 
                    checked
                      ? [...prev, star]
                      : prev.filter((s) => s !== star)
                  )
                }}
              />
              <Label htmlFor={`rating-${star}`} className="ml-2">
                {star} stars and above
              </Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="availability">
        <AccordionTrigger>Availability</AccordionTrigger>
        <AccordionContent>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <div key={day} className="flex items-center mb-2">
              <Checkbox
                id={`day-${day}`}
                checked={availability.includes(day)}
                onCheckedChange={(checked) => {
                  setAvailability(prev => 
                    checked
                      ? [...prev, day]
                      : prev.filter((d) => d !== day)
                  )
                }}
              />
              <Label htmlFor={`day-${day}`} className="ml-2">
                {day}
              </Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="features">
        <AccordionTrigger>Special Features</AccordionTrigger>
        <AccordionContent>
          {['Catering', 'Gluten-free', 'Vegan', 'Organic', 'Nut-free'].map((feature) => (
            <div key={feature} className="flex items-center mb-2">
              <Checkbox
                id={`feature-${feature}`}
                checked={features.includes(feature)}
                onCheckedChange={(checked) => {
                  setFeatures(prev => 
                    checked
                      ? [...prev, feature]
                      : prev.filter((f) => f !== feature)
                  )
                }}
              />
              <Label htmlFor={`feature-${feature}`} className="ml-2">
                {feature}
              </Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="categories">
        <AccordionTrigger>Category</AccordionTrigger>
        <AccordionContent>
          {['Full meals', 'Desserts', 'Snacks', 'Baking'].map((category) => (
            <div key={category} className="flex items-center mb-2">
              <Checkbox
                id={`category-${category}`}
                checked={categories.includes(category)}
                onCheckedChange={(checked) => {
                  setCategories(prev => 
                    checked
                      ? [...prev, category]
                      : prev.filter((c) => c !== category)
                  )
                }}
              />
              <Label htmlFor={`category-${category}`} className="ml-2">
                {category}
              </Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="cuisines">
        <AccordionTrigger>Cuisines</AccordionTrigger>
        <AccordionContent>
          {['Italian', 'Mediterranean', 'Vegan', 'Raw', 'Fusion', 'Asian', 'European'].map((cuisine) => (
            <div key={cuisine} className="flex items-center mb-2">
              <Checkbox
                id={`cuisine-${cuisine}`}
                checked={cuisines.includes(cuisine)}
                onCheckedChange={(checked) => {
                  setCuisines(prev => 
                    checked
                      ? [...prev, cuisine]
                      : prev.filter((c) => c !== cuisine)
                  )
                }}
              />
              <Label htmlFor={`cuisine-${cuisine}`} className="ml-2">
                {cuisine}
              </Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

