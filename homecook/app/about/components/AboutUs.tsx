import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Utensils, Users, Shield } from 'lucide-react'

export default function AboutUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-green-800">About Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-green-700">
                <Heart className="mr-2 text-orange-500" /> Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>At HomeCook, we&apos;re on a mission to connect food lovers with skilled home chefs, creating a community where culinary passion meets opportunity. We empower cooks to turn their kitchen talents into thriving businesses while offering food enthusiasts access to unique, personalized dining experiences.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-green-700">
                <Utensils className="mr-2 text-orange-500" /> What We Offer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Personalized meal options tailored to your tastes</li>
                <li>A diverse array of cuisines from talented local chefs</li>
                <li>Convenient ordering and delivery/pickup options</li>
                <li>A platform for chefs to showcase their skills and grow their business</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-green-700">
              <Users className="mr-2 text-orange-500" /> Our Story
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>HomeCook was born from a simple idea: great food should be accessible to everyone, and talented cooks should have the opportunity to share their creations. Our founders, passionate food lovers themselves, recognized the abundance of culinary talent in home kitchens and set out to create a platform that would bring these hidden gems to the forefront of local food scenes.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-green-700">
              <Shield className="mr-2 text-orange-500" /> Our Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Food Safety:</strong> We prioritize the health and safety of our community, ensuring all chefs adhere to strict food safety standards.</li>
              <li><strong>Quality:</strong> We&apos;re committed to delivering exceptional culinary experiences, promoting only the best home-cooked meals.</li>
              <li><strong>Community Empowerment:</strong> We believe in nurturing local talent and fostering a supportive network of food enthusiasts and chefs.</li>
              <li><strong>Sustainability:</strong> We encourage sustainable practices in cooking and packaging to minimize our environmental impact.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

