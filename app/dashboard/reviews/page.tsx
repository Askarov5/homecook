"use client"

import { useState } from 'react'
import { ReviewsList } from '../components/ReviewsList'
import { AverageRating } from '../components/AverageRating'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell } from 'lucide-react'
import { Switch } from "@/components/ui/switch"

export default function ReviewsPage() {
  const [sortBy, setSortBy] = useState('newest')
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Recent Reviews</CardTitle>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="highest">Highest Rating</SelectItem>
                  <SelectItem value="lowest">Lowest Rating</SelectItem>
                  <SelectItem value="helpful">Most Helpful</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              
              <ReviewsList sortBy={sortBy} />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <AverageRating />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-orange-500">
                <Bell />
                <span>You have 3 new reviews</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

