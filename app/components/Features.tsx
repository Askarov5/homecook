import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, Calendar, Star, Clock, ShoppingBag } from 'lucide-react'

const features = [
  {
    icon: Utensils,
    title: "Personalized Menus",
    description: "Talented chefs create custom menus just for you"
  },
  {
    icon: Calendar,
    title: "Convenient Catering",
    description: "Book catering services for any occasion"
  },
  {
    icon: Star,
    title: "Verified Reviews",
    description: "Find trusted cooks with authentic customer feedback"
  },
  {
    icon: ShoppingBag,
    title: "Ready to Pick up Meals",
    description: "Order prepared meals for easy pickup"
  },
  {
    icon: Clock,
    title: "Future Orders",
    description: "Place orders for upcoming dates"
  }
]

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="transition-transform hover:scale-105">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-orange-500 mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600">
            Our platform offers easy management tools for chefs, allowing them to efficiently handle orders and menus.
          </p>
        </div>
      </div>
    </section>
  )
}

