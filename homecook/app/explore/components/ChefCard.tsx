import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'
import { Chef } from '@/app/types'

interface ChefCardProps {
  chef: Chef
}

export function ChefCard({ chef }: ChefCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={chef.image}
          alt={chef.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{chef.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{chef.bio}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {chef.cuisines.map((cuisine) => (
            <span key={cuisine} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              {cuisine}
            </span>
          ))}
        </div>
        <p className="text-gray-600 text-sm mb-2">{chef.location}</p>
        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span className="font-semibold mr-1">{chef.rating.toFixed(1)}</span>
          <span className="text-gray-600 text-sm">({chef.reviews} reviews)</span>
        </div>
        <p className="text-gray-600 text-sm">Min. order price ${chef.startingPrice}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/chef/${chef.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

