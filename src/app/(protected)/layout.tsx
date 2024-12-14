import { NavBar } from "@/components/ui/nav-bar"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {children}
    </div>
  )
} 