'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Bell } from "lucide-react"
import { cn } from "@/lib/utils"

export function NavBar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname?.startsWith(path)
  }

  const navigationLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/befragung', label: 'Befragung' },
    { href: '/dashboard/abteilungen', label: 'Abteilungen' },
    { href: '/dashboard/betriebe', label: 'Betriebe' },
    { href: '/dashboard/auswertungen', label: 'Auswertungen' },
  ]

  return (
    <nav className="border-b bg-white">
      <div className="flex h-16 items-center px-4 max-w-[1200px] mx-auto">
        <Link href="/dashboard" className="mr-6">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
          </div>
        </Link>
        
        <div className="flex gap-6 flex-1">
          {navigationLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(link.href) && "text-blue-600"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-gray-500" />
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  )
} 