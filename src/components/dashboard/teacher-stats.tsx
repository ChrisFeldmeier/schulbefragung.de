'use client'

import { Card } from "@/components/ui/card"

const teacherStats = [
  { name: "Durchschnittliche Bewertung", value: "4.1" },
  { name: "Beste Bewertung", value: "4.8" },
  { name: "Anzahl Bewertungen", value: "1,234" },
  { name: "Aktive Lehrer", value: "45" },
]

export function TeacherStats() {
  return (
    <div className="space-y-4">
      {teacherStats.map((stat) => (
        <div key={stat.name} className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{stat.name}</span>
          <span className="font-semibold">{stat.value}</span>
        </div>
      ))}
    </div>
  )
}