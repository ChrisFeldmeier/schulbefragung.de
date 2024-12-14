'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Edit2, Eye } from "lucide-react"
import { useState } from "react"
import { NewDepartmentDialog } from "./new-department-dialog"
import { toast } from "sonner"

interface Department {
  id: number
  name: string
  shortName: string
  rating: number
  feedbacks: number
  trend: 'up' | 'down'
  description?: string
}

const initialDepartments: Department[] = [
  { id: 1, name: 'Informatik', shortName: 'INF', rating: 4.8, feedbacks: 127, trend: 'up', description: 'Ausbildung in Softwareentwicklung und IT-Systeme' },
  { id: 2, name: 'Elektrotechnik', shortName: 'ELT', rating: 4.6, feedbacks: 98, trend: 'up', description: 'Fokus auf elektrische Systeme und Automation' },
  { id: 3, name: 'Maschinenbau', shortName: 'MB', rating: 4.5, feedbacks: 156, trend: 'up', description: 'Konstruktion und Entwicklung von Maschinen' },
  { id: 4, name: 'Wirtschaft', shortName: 'WI', rating: 4.3, feedbacks: 89, trend: 'down', description: 'Betriebswirtschaft und Management' },
  { id: 5, name: 'Mechatronik', shortName: 'MT', rating: 4.7, feedbacks: 112, trend: 'up', description: 'Kombination aus Mechanik und Elektronik' },
  { id: 6, name: 'Fahrzeugtechnik', shortName: 'FT', rating: 4.4, feedbacks: 78, trend: 'down', description: 'Entwicklung und Wartung von Fahrzeugen' },
  { id: 7, name: 'Automatisierung', shortName: 'AT', rating: 4.6, feedbacks: 94, trend: 'up', description: 'Automatisierungstechnik und Robotik' }
]

export default function DepartmentList() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'feedback'>('name')

  // Filter departments based on search query
  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort departments based on selected criteria
  const sortedDepartments = [...filteredDepartments].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'feedback':
        return b.feedbacks - a.feedbacks
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const handleAddDepartment = (newDept: { name: string; shortName: string; description: string }) => {
    const newDepartment: Department = {
      id: departments.length + 1,
      name: newDept.name,
      shortName: newDept.shortName.toUpperCase(),
      rating: 0,
      feedbacks: 0,
      trend: 'up',
      description: newDept.description
    }
    setDepartments([...departments, newDepartment])
    toast.success('Abteilung erfolgreich erstellt')
  }

  return (
    <main className="max-w-[1200px] mx-auto p-4">
      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Abteilung suchen..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex items-center gap-4">
          <Select
            value={sortBy}
            onValueChange={(value: 'name' | 'rating' | 'feedback') => setSortBy(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Nach Name sortieren" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nach Name sortieren</SelectItem>
              <SelectItem value="rating">Nach Bewertung sortieren</SelectItem>
              <SelectItem value="feedback">Nach Feedback sortieren</SelectItem>
            </SelectContent>
          </Select>

          <NewDepartmentDialog onAdd={handleAddDepartment} />
        </div>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedDepartments.map((dept) => (
          <Card key={dept.id} className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{dept.name}</h3>
                <p className="text-sm text-gray-500">{dept.shortName}</p>
                {dept.description && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{dept.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Edit2 className="h-4 w-4 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Eye className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-2xl font-semibold">{dept.rating || '-'}</p>
                <p className="text-sm text-gray-500">Bewertung</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold">{dept.feedbacks}</p>
                <p className="text-sm text-gray-500">Feedbacks</p>
              </div>
              <div className="text-center">
                <div className={dept.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}>
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: dept.trend === 'down' ? 'rotate(180deg)' : 'none' }}
                  >
                    <path
                      d="M2 20L12 4L22 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">Trend</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
} 