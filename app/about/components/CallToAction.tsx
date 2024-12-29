import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="py-16 bg-green-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Join the HomeCook Community?</h2>
        <p className="mb-8 text-lg">Whether you&apos;re a food lover or a talented chef, theres a place for you in our culinary world.</p>
        <div className="flex justify-center space-x-4">
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
            <Link href="/signup?type=chef">Join as a Chef</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white text-green-800 hover:bg-green-100">
            <Link href="/explore">Find Your Chef</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

