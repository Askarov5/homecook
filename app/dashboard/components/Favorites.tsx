import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const favoriteChefs = [
  { id: 1, name: 'Alice Johnson', image: '/placeholder.svg?height=100&width=100&text=Alice', cuisine: 'Italian' },
  { id: 2, name: 'Bob Smith', image: '/placeholder.svg?height=100&width=100&text=Bob', cuisine: 'Japanese' },
  { id: 3, name: 'Charlie Davis', image: '/placeholder.svg?height=100&width=100&text=Charlie', cuisine: 'Mexican' },
]

export function Favorites() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Favorite Chefs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteChefs.map((chef) => (
            <div key={chef.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <Image
                src={chef.image}
                alt={chef.name}
                width={100}
                height={100}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold">{chef.name}</h3>
                <p className="text-sm text-gray-500">{chef.cuisine} Cuisine</p>
                <Button variant="outline" size="sm" className="mt-2">View Profile</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

