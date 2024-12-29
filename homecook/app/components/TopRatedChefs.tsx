import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'

interface Chef {
  id: number
  name: string
  image: string
  rating: number
  cuisine: string
}

const topChefs: Chef[] = [
  { id: 1, name: "Chef Alice", image: "https://placehold.co/300x300.png?text=Chef+Alice", rating: 4.9, cuisine: "Italian" },
  { id: 2, name: "Chef Bob", image: "https://placehold.co/300x300.png?text=Chef+Bob", rating: 4.8, cuisine: "Japanese" },
  { id: 3, name: "Chef Charlie", image: "https://placehold.co/300x300.png?text=Chef+Charlie", rating: 4.7, cuisine: "Mexican" },
]

export default function TopRatedChefs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Top Rated Chefs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topChefs.map((chef) => (
            <Card key={chef.id} className="overflow-hidden">
              <Image
                src={chef.image}
                alt={chef.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2">{chef.name}</h3>
                <p className="text-gray-600 mb-2">{chef.cuisine} Cuisine</p>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-semibold">{chef.rating.toFixed(1)}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/chef/${chef.id}`} className="w-full">
                  <Button variant="outline" className="w-full">View Profile</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <Link href="/explore">Show All Chefs</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

