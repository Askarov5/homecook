import { Star } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

export function AverageRating() {
  const averageRating = 4.5
  const totalReviews = 20
  const ratingBreakdown = [
    { stars: 5, count: 10 },
    { stars: 4, count: 5 },
    { stars: 3, count: 3 },
    { stars: 2, count: 1 },
    { stars: 1, count: 1 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-6 w-6 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-500">{totalReviews} reviews</p>
      <div className="space-y-2">
        {ratingBreakdown.map(({ stars, count }) => (
          <div key={stars} className="flex items-center space-x-2">
            <span className="w-2">{stars}</span>
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Progress value={(count / totalReviews) * 100} className="h-2 w-full" />
            <span className="text-sm text-gray-500">{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

