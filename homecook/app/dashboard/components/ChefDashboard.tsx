import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardMetric } from './DashboardMetric'
import { OrdersList } from './OrdersList'
import { ReviewsList } from './ReviewsList'
import { MonthlyOrdersChart } from './MonthlyOrdersChart'

export function ChefDashboard() {
  // Mock data - replace with real data fetching
  const chef = {
    name: 'Alice Johnson',
    profilePicture: '/placeholder.svg?height=100&width=100',
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image
            src={chef.profilePicture}
            alt={chef.name}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {chef.name}!</h1>
            <p className="text-gray-600">Here's what's happening with your kitchen today.</p>
          </div>
        </div>
        <Button asChild>
          <Link href="/dashboard/profile">Update Profile</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardMetric title="Orders Received" value="24" trend="+5%" />
        <DashboardMetric title="Monthly Revenue" value="$1,234" trend="+12%" />
        <DashboardMetric title="Menu Views" value="1,500" trend="+8%" />
        <DashboardMetric title="Average Rating" value="4.8" icon="star" />
      </div>

      <MonthlyOrdersChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>Add Menu Item</Button>
            <Button variant="outline">Update Availability</Button>
            <Button variant="outline">View All Orders</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <OrdersList />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewsList />
        </CardContent>
      </Card>
    </div>
  )
}

