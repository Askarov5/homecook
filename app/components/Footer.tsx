import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About HomeCook</h3>
            <p className="text-sm">Connecting food lovers with talented home chefs for delicious, personalized meals.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:underline">About Us</Link></li>
              <li><Link href="/explore" className="text-sm hover:underline">Explore Chefs</Link></li>
              <li><Link href="/contact" className="text-sm hover:underline">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm hover:underline">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-sm hover:underline">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-sm hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/homecook" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
                <Facebook />
              </Link>
              <Link href="https://www.instagram.com/homecook" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
                <Instagram />
              </Link>
              <Link href="https://www.twitter.com/homecook" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
                <Twitter />
              </Link>
            </div>
            <p className="mt-4 text-sm">Email: support@homecook.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-700 text-center">
          <p className="text-sm">&copy; 2023 HomeCook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

