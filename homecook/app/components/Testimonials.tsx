import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "Sarah L.",
    avatar: "/avatar1.jpg",
    rating: 5,
    text: "HomeCook has transformed my dining experience. The chefs are incredible, and the meals are always delicious!"
  },
  {
    name: "Mike R.",
    avatar: "/avatar2.jpg",
    rating: 4,
    text: "I love the variety of cuisines available. It's like traveling the world through food, right from my home."
  },
  {
    name: "Emily T.",
    avatar: "/avatar3.jpg",
    rating: 5,
    text: "The catering service for my birthday party was a hit! Everyone raved about the food and presentation."
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="transition-transform hover:scale-105">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
              </CardContent>
              <CardFooter className="flex items-center">
                <Avatar className="mr-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{testimonial.name}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

