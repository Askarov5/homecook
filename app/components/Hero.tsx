import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <Image
        src="/placeholder.svg?height=600&width=1600&text=Hero+Image"
        alt="Home chef preparing a meal"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
          Discover Delicious Home-Cooked Meals Near You
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-fade-in-up animation-delay-200">
          Find talented home chefs offering personalized menus, catering services, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
            <Link href="/explore">Search for Cooks</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-white text-orange-500 hover:bg-orange-100" asChild>
            <Link href="/signup">Sign Up Now</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

