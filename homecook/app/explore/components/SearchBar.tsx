"use client"

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SearchBarProps {
  onSearch: (searchTerm: string, cuisine: string, location: string) => void
  initialTerm?: string
}

export function SearchBar({ onSearch, initialTerm = '' }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialTerm)
  const [cuisine, setCuisine] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    setSearchTerm(initialTerm)
  }, [initialTerm])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm, cuisine, location)
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
      <div className="flex-grow">
        <Input
          type="text"
          placeholder="Search by chef, dish, or cuisine"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <Select value={cuisine} onValueChange={setCuisine}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Cuisine" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="italian">Italian</SelectItem>
          <SelectItem value="indian">Indian</SelectItem>
          <SelectItem value="vegan">Vegan</SelectItem>
          {/* Add more cuisine options */}
        </SelectContent>
      </Select>
      <Input
        type="text"
        placeholder="City, zip code, or neighborhood"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full md:w-[250px]"
      />
      <Button type="submit" className="w-full md:w-auto">
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
    </form>
  )
}

