'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, LogOut, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavBar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // TODO: Implement actual logout logic here
    router.push('/login')
  }

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-sm font-medium hover:text-primary focus:outline-none">
                Administrator
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-red-600 cursor-pointer flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Abmelden</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
} 