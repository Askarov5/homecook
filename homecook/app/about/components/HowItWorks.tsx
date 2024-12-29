import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Menu, ShoppingCart, Truck, Star, UserPlus, ChefHat, DollarSign } from 'lucide-react'

export default function HowItWorks() {
  return (
    <section className="py-16 bg-beige-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-800">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-orange-600">For Customers</h3>
            <div className="space-y-4">
              {[
                { icon: Search, title: "Search for Chefs", description: "Use filters like cuisine, location, and dietary preferences to find the perfect chef." },
                { icon: Menu, title: "Browse Menus", description: "Explore detailed menus with pricing, reviews, and available services." },
                { icon: ShoppingCart, title: "Place an Order", description: "Enter your desired quantity and any dietary requirements." },
                { icon: Truck, title: "Pick Up or Deliver", description: "Coordinate with the chef for pickup or delivery." },
                { icon: Star, title: "Enjoy and Review", description: "Share your feedback to help the community find the best chefs." },
              ].map((step, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg text-green-700">
                      <step.icon className="mr-2 text-orange-500" /> {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-orange-600">For Chefs</h3>
            <div className="space-y-4">
              {[
                { icon: UserPlus, title: "Create a Profile", description: "Highlight your skills, specialties, and menu offerings." },
                { icon: Menu, title: "Manage Your Menu", description: "Add photos, pricing, and descriptions for each dish." },
                { icon: ShoppingCart, title: "Receive Orders", description: "Accept orders and communicate with customers." },
                { icon: ChefHat, title: "Fulfill Requests", description: "Prepare meals and coordinate pickup or delivery." },
                { icon: DollarSign, title: "Earn Money", description: "Get paid for your services and grow your cooking business." },
              ].map((step, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg text-green-700">
                      <step.icon className="mr-2 text-orange-500" /> {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

