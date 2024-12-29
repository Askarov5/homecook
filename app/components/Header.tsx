"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, Search, User } from 'lucide-react'

// This would come from your authentication context
const isAuthenticated = false;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="HomeCook Logo" width={40} height={40} />
            <span className="ml-2 text-xl font-bold text-green-800">HomeCook</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/" className="text-gray-600 hover:text-green-800">Home</Link>
          <Link href="/explore" className="text-gray-600 hover:text-green-800">Explore Chefs</Link>
          <Link href="/about" className="text-gray-600 hover:text-green-800">About</Link>
          <Link href="/contact" className="text-gray-600 hover:text-green-800">Contact Us</Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center">
          <Input type="text" placeholder="Search..." className="w-64 mr-2" />
          <Button size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Authentication Buttons or User Menu */}
        <div className="hidden md:block">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-800 hover:bg-gray-50">Home</Link>
            <Link href="/explore" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-800 hover:bg-gray-50">Explore Chefs</Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-800 hover:bg-gray-50">About</Link>
            <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-800 hover:bg-gray-50">Contact Us</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-800 hover:bg-gray-50">Dashboard</Link>
                <Link href="/profile" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-800 hover:bg-gray-50">Profile Settings</Link>
                <Link href="/logout" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-800 hover:bg-gray-50">Log Out</Link>
              </>
            ) : (
              <>
                <Link href="/signin" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-800 hover:bg-gray-50">Sign In</Link>
                <Link href="/signup" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-800 hover:bg-gray-50">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

