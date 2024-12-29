"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/explore?search=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <section className="py-8 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
          <Input
            type="text"
            placeholder="Find chefs by cuisine, city, or zip code"
            className="flex-grow text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" size="lg" className="bg-orange-500 hover:bg-orange-600 text-white w-full md:w-auto">
            <Search className="mr-2 h-5 w-5" /> Search
          </Button>
        </form>
      </div>
    </section>
  )
}

