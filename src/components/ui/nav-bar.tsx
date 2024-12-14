import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Bell } from "lucide-react"

export function NavBar() {
  return (
    <nav className="border-b bg-white">
      <div className="flex h-16 items-center px-4 max-w-[1200px] mx-auto">
        <Link href="/dashboard" className="mr-6">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
          </div>
        </Link>
        
        <div className="flex gap-6 flex-1">
          <Link 
            href="/dashboard" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link 
            href="/dashboard/befragung" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Befragung
          </Link>
          <Link 
            href="/dashboard/abteilungen" 
            className="text-sm font-medium text-blue-600"
          >
            Abteilungen
          </Link>
          <Link 
            href="/dashboard/betriebe" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Betriebe
          </Link>
          <Link 
            href="/dashboard/bewertungen" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Bewertungen
          </Link>
          <Link 
            href="/dashboard/auswertungen" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Auswertungen
          </Link>
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