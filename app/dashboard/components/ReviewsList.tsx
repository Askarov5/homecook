import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, Flag, MessageSquare } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog"
import { Review } from '@/app/types'

interface ReviewsListProps {
  sortBy: string
}

export function ReviewsList({ sortBy }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, customerName: 'Alice Brown', rating: 5, comment: 'Delicious food and great service!', date: '2023-06-01', location: 'New York, NY', dietaryPreferences: ['Vegetarian'], ratingBreakdown: { food: 5, service: 5, value: 5 }, flagged: false },
    { id: 2, customerName: 'Bob Smith', rating: 4, comment: 'Tasty dishes, but delivery was a bit late.', date: '2023-05-28', location: 'Los Angeles, CA', dietaryPreferences: ['Gluten-free'], ratingBreakdown: { food: 5, service: 3, value: 4 }, flagged: false },
    { id: 3, customerName: 'Charlie Davis', rating: 5, comment: 'Absolutely loved the pasta! Will order again.', date: '2023-05-25', location: 'Chicago, IL', dietaryPreferences: ['Dairy-free'], ratingBreakdown: { food: 5, service: 5, value: 5 }, flagged: false },
  ])
  const [filteredReviews, setFilteredReviews] = useState(reviews)

  const handleReply = (id: number, reply: string) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, reply } : review
    ))
  }

  const handleFlag = (id: number) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, flagged: true } : review
    ))
  }

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'highest':
        return b.rating - a.rating
      case 'lowest':
        return a.rating - b.rating
      case 'helpful':
        // This would typically be based on user votes, but for this example, we'll use the rating
        return b.rating - a.rating
      case 'flagged':
        return (b.flagged === a.flagged) ? 0 : b.flagged ? -1 : 1
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {sortedReviews.map(review => (
        <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.customerName}`} />
              <AvatarFallback>{review.customerName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{review.customerName}</h4>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="mt-2">{review.comment}</p>
              {review.reply && (
                <div className="mt-4 bg-gray-100 p-4 rounded-md">
                  <p className="text-sm font-semibold">Your reply:</p>
                  <p className="text-sm mt-1">{review.reply}</p>
                </div>
              )}
              <div className="mt-4 flex justify-between items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {review.reply ? 'Edit Reply' : 'Reply'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reply to {review.customerName}</DialogTitle>
                      <DialogDescription>Your response will be visible to all customers.</DialogDescription>
                    </DialogHeader>
                    <Textarea
                      placeholder="Write your reply..."
                      defaultValue={review.reply}
                      id={`reply-${review.id}`}
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button onClick={() => {
                          const textarea = document.getElementById(`reply-${review.id}`) as HTMLTextAreaElement
                          handleReply(review.id, textarea.value)
                          textarea.value = ''
                        }}>
                          Send Reply
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  variant={review.flagged ? "destructive" : "ghost"}
                  size="sm"
                  onClick={() => handleFlag(review.id)}
                  disabled={review.flagged}
                >
                  <Flag className="mr-2 h-4 w-4" />
                  {review.flagged ? 'Flagged' : 'Flag'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

