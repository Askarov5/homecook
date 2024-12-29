"use client"

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Review } from '@/app/types'

export function CustomerReviews({ reviews }: { reviews: Review[] }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false) // This should be replaced with actual auth state
  const [showAllReviews, setShowAllReviews] = useState(false)

  const handleReviewClick = () => {
    if (isAuthenticated) {
      // Open review form
      console.log("Open review form")
    } else {
      // Redirect to auth page
      console.log("Redirect to auth page")
    }
  }

  return (
    <section className="mb-12" id="reviews">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-green-800">Customer Reviews</h2>
        <Button onClick={handleReviewClick} className="bg-green-600 hover:bg-green-700 text-white">
          {isAuthenticated ? "Leave a Review" : "Sign in to Review"}
        </Button>
      </div>
      <div className="grid gap-6">
        {reviews.slice(0, 5).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      {reviews.length > 5 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" 
              onClick={() => setShowAllReviews(!showAllReviews)}
            className="mt-4 text-green-600 border-green-600 hover:bg-green-50">View All Reviews</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-green-800">All Reviews</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-green-700">{review.customerName}</h3>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-600">{review.comment}</p>
    </div>
  )
}

