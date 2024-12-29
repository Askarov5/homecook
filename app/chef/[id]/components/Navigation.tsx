"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'

export function Navigation() {
  const [isSticky, setIsSticky] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`bg-white ${isSticky ? 'sticky top-0 shadow-md' : ''} z-10`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-green-800">
            HomeCook
          </Link>
          <div className="hidden md:flex space-x-4">
            <NavLink href="#menu">Menu</NavLink>
            <NavLink href="#reviews">Reviews</NavLink>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Contact</Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="text-green-800" />
            </Button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <NavLink href="#menu" mobile>Menu</NavLink>
            <NavLink href="#reviews" mobile>Reviews</NavLink>
            <Button className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white">Contact</Button>
          </div>
        )}
      </div>
    </nav>
  )
}

function NavLink({ href, children, mobile = false }: { href: string; children: React.ReactNode; mobile?: boolean }) {
  return (
    <Link
      href={href}
      className={`text-gray-600 hover:text-green-800 ${mobile ? 'block py-2' : ''}`}
    >
      {children}
    </Link>
  )
}

