import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Utensils, Smile, UserPlus, ClipboardList, DollarSign } from 'lucide-react'
import Link from "next/link"

const customerSteps = [
  { icon: Search, title: "Search", description: "Find local chefs by cuisine, location, or rating." },
  { icon: ClipboardList, title: "Order", description: "Place an order and specify dietary needs." },
  { icon: Smile, title: "Enjoy", description: "Enjoy your home-cooked meal!" },
]

const chefSteps = [
  { icon: UserPlus, title: "Join", description: "Create a profile showcasing your skills and menu." },
  { icon: Utensils, title: "Cook", description: "Receive and manage orders effortlessly." },
  { icon: DollarSign, title: "Earn", description: "Earn money doing what you love!" },
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center">For Customers</h3>
            <div className="space-y-6">
              {customerSteps.map((step, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <step.icon className="mr-2 h-6 w-6 text-orange-500" />
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>{step.description}</CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center">For Chefs</h3>
            <div className="space-y-6">
              {chefSteps.map((step, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <step.icon className="mr-2 h-6 w-6 text-green-500" />
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>{step.description}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button asChild>
            <Link href="/how-it-works">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

