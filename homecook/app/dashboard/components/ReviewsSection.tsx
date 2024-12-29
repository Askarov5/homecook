import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star } from 'lucide-react'

interface Review {
  id: number
  customerName: string
  rating: number
  comment: string
  date: string
  reply?: string
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, customerName: 'Alice Brown', rating: 5, comment: 'Delicious food and great service!', date: '2023-06-01' },
    { id: 2, customerName: 'Bob Smith', rating: 4, comment: 'Tasty dishes, but delivery was a bit late.', date: '2023-05-28' },
    { id: 3, customerName: 'Charlie Davis', rating: 5, comment: 'Absolutely loved the pasta! Will order again.', date: '2023-05-25' },
  ])

  const handleReply = (id: number, reply: string) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, reply } : review
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.customerName}`} />
                  <AvatarFallback>{review.customerName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{review.customerName}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="mt-1">{review.comment}</p>
                  {review.reply && (
                    <div className="mt-2 bg-gray-100 p-2 rounded">
                      <p className="text-sm font-semibold">Your reply:</p>
                      <p className="text-sm">{review.reply}</p>
                    </div>
                  )}
                  {!review.reply && (
                    <div className="mt-2">
                      <Textarea
                        placeholder="Write your reply..."
                        className="mb-2"
                      />
                      <Button onClick={() => handleReply(review.id, 'Thank you for your feedback!')}>
                        Send Reply
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

