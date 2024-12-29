"use client"

import { useState, useCallback, useMemo, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { SearchBar } from './SearchBar'
import { FilterPanel } from './FilterPanel'
import { ChefCard } from './ChefCard'
import { MapView } from './MapView'
import { Chef } from '@/app/types'

// Mock data for chefs
const chefs: Chef[] = [
  {
    id: 1,
    name: "Chef Alice",
    image: "https://placehold.co/300x300.png?&text=Chef+Alice",
    bio: "Specializing in Italian cuisine with a modern twist.",
    cuisines: ["Italian", "Mediterranean"],
    location: "New York, NY",
    rating: 4.8,
    reviews: 120,
    startingPrice: 25,
    availability: ["Monday", "Wednesday", "Friday"],
    features: ["Catering", "Gluten-free"],
    categories: ["Full meals", "Desserts"],
    minPreorderDays: 2,
    socialMedia: {
      instagram: "chef_alice",
      whatsapp: "+1234567890",
      telegram: "@chef_alice"
    },
    portfolio: Array(5).fill("https://placehold.co/300x300.png?text=Portfolio"),
    menu: [],
    readyMeals: [],
    cateringServices: "Available for events up to 50 people",
    customerReviews: []
  },
  {
    id: 2,
    name: "Chef Bob",
    image: "https://placehold.co/300x300.png?text=Chef+Bob",
    bio: "Master of vegan and plant-based delicacies.",
    cuisines: ["Vegan", "Raw"],
    location: "Los Angeles, CA",
    rating: 4.6,
    reviews: 95,
    startingPrice: 30,
    availability: ["Tuesday", "Thursday", "Saturday"],
    features: ["Vegan", "Organic"],
    categories: ["Full meals", "Snacks"],
    minPreorderDays: 3,
    socialMedia: {
      instagram: "chef_bob",
      whatsapp: "+1987654321",
      telegram: "@chef_bob"
    },
    portfolio: Array(5).fill("https://placehold.co/300x300.png?text=Portfolio"),
    menu: [],
    readyMeals: [],
    cateringServices: "Specializing in vegan catering for all occasions",
    customerReviews: []
  },
  {
    id: 3,
    name: "Chef Charlie",
    image: "https://placehold.co/300x300.png?text=Chef+Charlie",
    bio: "Fusion cuisine expert, blending Asian and European flavors.",
    cuisines: ["Fusion", "Asian", "European"],
    location: "San Francisco, CA",
    rating: 4.9,
    reviews: 150,
    startingPrice: 35,
    availability: ["Monday", "Tuesday", "Friday", "Saturday"],
    features: ["Private dining", "Cooking classes"],
    categories: ["Full meals", "Appetizers"],
    minPreorderDays: 4,
    socialMedia: {
      instagram: "chef_charlie",
      whatsapp: "+1122334455",
      telegram: "@chef_charlie"
    },
    portfolio: Array(5).fill("https://placehold.co/300x300.png?text=Portfolio"),
    menu: [],
    readyMeals: [],
    cateringServices: "Offering unique fusion experiences for special events",
    customerReviews: []
  },
]

interface Filters {
  priceRange: [number, number];
  rating: string[];
  availability: string[];
  features: string[];
  categories: string[];
  cuisines: string[];
}

interface ExploreChefProps {
  initialSearch?: string;
}

export default function ExploreChefs({ initialSearch }: ExploreChefProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 100],
    rating: [],
    availability: [],
    features: [],
    categories: [],
    cuisines: [],
  })
  const [searchParams, setSearchParams] = useState({ term: initialSearch || '', cuisine: '', location: '' })

  useEffect(() => {
    if (initialSearch) {
      setSearchParams(prev => ({ ...prev, term: initialSearch }))
    }
  }, [initialSearch])

  const toggleViewMode = useCallback(() => {
    setViewMode((prevMode) => (prevMode === 'list' ? 'map' : 'list'))
  }, [])

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters)
  }, [])

  const handleSearch = useCallback((searchTerm: string, cuisine: string, location: string) => {
    setSearchParams({ term: searchTerm, cuisine, location })
  }, [])

  const filteredChefs = useMemo(() => {
    return chefs.filter((chef) => {
      const { priceRange, rating, availability, features, categories, cuisines } = filters
      const { term, cuisine, location } = searchParams

      const matchesSearch = 
        chef.name.toLowerCase().includes(term.toLowerCase()) ||
        chef.cuisines.some(c => c.toLowerCase().includes(term.toLowerCase())) ||
        chef.location.toLowerCase().includes(term.toLowerCase())

      const matchesCuisine = cuisine === '' || chef.cuisines.includes(cuisine)
      const matchesLocation = location === '' || chef.location.toLowerCase().includes(location.toLowerCase())
      
      const matchesPriceRange = chef.startingPrice >= priceRange[0] && chef.startingPrice <= priceRange[1]
      const matchesRating = rating.length === 0 || rating.includes(Math.floor(chef.rating).toString())
      const matchesAvailability = availability.length === 0 || availability.some(day => chef.availability.includes(day))
      const matchesFeatures = features.length === 0 || features.every(feature => chef.features.includes(feature))
      const matchesCategories = categories.length === 0 || categories.some(category => chef.categories.includes(category))
      const matchesCuisines = cuisines.length === 0 || cuisines.some(cuisine => chef.cuisines.includes(cuisine))

      return matchesSearch && matchesCuisine && matchesLocation && 
             matchesPriceRange && matchesRating && matchesAvailability && 
             matchesFeatures && matchesCategories && matchesCuisines
    })
  }, [chefs, filters, searchParams])

  return (
    <div className="min-h-screen bg-beige-50">
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Explore Chefs</h1>
          <p className="text-xl text-gray-600">Discover talented chefs in your area and find your perfect culinary match.</p>
        </header>
        <SearchBar onSearch={handleSearch} initialTerm={searchParams.term} />
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <aside className="w-full md:w-1/4">
            <FilterPanel onFilterChange={handleFilterChange} />
          </aside>
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">{filteredChefs.length} chefs found</p>
              <Button onClick={toggleViewMode}>
                {viewMode === 'list' ? 'Map View' : 'List View'}
              </Button>
            </div>
            {viewMode === 'list' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChefs.map((chef) => (
                  <ChefCard key={chef.id} chef={chef} />
                ))}
              </div>
            ) : (
              <MapView chefs={filteredChefs} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

