'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { authenticate } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    department: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const user = await authenticate(formData.username, formData.password)
      if (user) {
        toast.success('Erfolgreich angemeldet')
        router.push('/dashboard/abteilungen')
      } else {
        toast.error('Ungültige Anmeldedaten')
      }
    } catch (error) {
      toast.error('Ein Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-center mb-2">
        Willkommen bei der Schul-Feedback-App
      </h1>
      <p className="text-gray-500 mb-8 text-center">
        Bitte melden Sie sich an, um fortzufahren
      </p>

      {/* Login Card */}
      <Card className="w-full max-w-md shadow-sm">
        <CardContent className="space-y-4 pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Benutzername</Label>
              <Input
                id="username"
                type="text"
                required
                className="h-11"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                required
                className="h-11"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Abteilung</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
                disabled={isLoading}
              >
                <SelectTrigger id="department" className="h-11">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inf">Informatik</SelectItem>
                  <SelectItem value="mech">Mechanik</SelectItem>
                  <SelectItem value="elec">Elektrotechnik</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 mt-6"
              disabled={isLoading}
            >
              {isLoading ? 'Wird angemeldet...' : 'Anmelden'}
            </Button>
          </form>
          <Button variant="link" className="w-full text-blue-600 font-normal">
            Passwort vergessen?
          </Button>
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-500">
        © 2025 Schul-Feedback-App. Alle Rechte vorbehalten.
      </footer>
    </main>
  )
} 