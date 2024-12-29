"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'

// This would come from your authentication context
const userType = 'cook' // or 'user'

const cookNavItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Menu Management", href: "/dashboard/menu" },
  { title: "Order Management", href: "/dashboard/orders" },
  { title: "Reviews", href: "/dashboard/reviews" },
  { title: "Portfolio", href: "/dashboard/portfolio" },
  { title: "Profile Visibility", href: "/dashboard/visibility" },
]

const userNavItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Order History", href: "/dashboard/orders" },
  { title: "Saved Chefs", href: "/dashboard/saved" },
  { title: "Reviews", href: "/dashboard/reviews" },
]

export function SideNav() {
  const pathname = usePathname()
  const navItems = userType === 'cook' ? cookNavItems : userNavItems

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileNav navItems={navItems} pathname={pathname} />
      </SheetContent>
    </Sheet>
  )
}

function MobileNav({ navItems, pathname }: { navItems: any[], pathname: string }) {
  return (
    <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
      <div className="flex flex-col space-y-3">
        {navItems.map((item) => (
          <MobileLink
            key={item.href}
            href={item.href}
            pathname={pathname}
          >
            {item.title}
          </MobileLink>
        ))}
      </div>
    </ScrollArea>
  )
}

function MobileLink({ href, pathname, children }: { href: string, pathname: string, children: React.ReactNode }) {
  return (
    <Link href={href} className={cn(
      "text-foreground/70 transition-colors hover:text-foreground",
      pathname === href && "text-foreground"
    )}>
      {children}
    </Link>
  )
}

