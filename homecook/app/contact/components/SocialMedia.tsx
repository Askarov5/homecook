import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function SocialMedia() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Connect With Us</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-4">
          <Link href="https://facebook.com/homecook" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-8 h-8 text-blue-600 hover:text-blue-700" />
          </Link>
          <Link href="https://instagram.com/homecook" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-8 h-8 text-pink-600 hover:text-pink-700" />
          </Link>
          <Link href="https://twitter.com/homecook" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-8 h-8 text-blue-400 hover:text-blue-500" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

