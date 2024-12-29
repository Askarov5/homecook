"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, ChefHat, ShoppingBag, Star, Settings, LogOut, Menu, Utensils } from 'lucide-react'
import { NotificationComponent } from './NotificationComponent'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Profile', href: '/dashboard/profile', icon: ChefHat },
  { name: 'Menu', href: '/dashboard/menu', icon: Utensils },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
  { name: 'Reviews', href: '/dashboard/reviews', icon: Star },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <MobileNav navItems={navItems} pathname={pathname} />
        </SheetContent>
      </Sheet>

      <div className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800">HomeCook</h1>
          <NotificationComponent />
        </div>
        <ScrollArea className="flex-1">
          <nav className="space-y-2 p-4">
            {navItems.map((item) => (
              <NavItem key={item.href} item={item} pathname={pathname} />
            ))}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            onClick={() => {
              // Implement logout logic here
              console.log('Logout clicked');
              // After logout, redirect to home page
              window.location.href = '/';
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </>
  )
}

function MobileNav({ navItems, pathname }: { navItems: typeof navItems, pathname: string }) {
  return (
    <ScrollArea className="h-full">
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-800">HomeCook</h1>
        <NotificationComponent />
      </div>
      <nav className="space-y-2 p-4">
        {navItems.map((item) => (
          <NavItem key={item.href} item={item} pathname={pathname} />
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          onClick={() => {
            // Implement logout logic here
            console.log('Logout clicked');
            // After logout, redirect to home page
            window.location.href = '/';
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </ScrollArea>
  )
}

function NavItem({ item, pathname }: { item: typeof navItems[number], pathname: string }) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start",
        pathname === item.href && "bg-gray-100 text-green-800"
      )}
      asChild
    >
      <Link href={item.href}>
        <item.icon className="mr-2 h-4 w-4" />
        {item.name}
      </Link>
    </Button>
  )
}

