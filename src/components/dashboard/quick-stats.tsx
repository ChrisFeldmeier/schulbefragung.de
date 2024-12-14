'use client'

import { Card } from "@/components/ui/card"
import { Users, School, Building2, TrendingUp } from "lucide-react"

const stats = [
  {
    name: "Aktive Befragungen",
    value: "432",
    change: "+12.3%",
    changeType: "positive",
    icon: Users,
  },
  {
    name: "Abteilungen",
    value: "13",
    change: "0",
    changeType: "neutral",
    icon: School,
  },
  {
    name: "Betriebe",
    value: "187",
    change: "+4.1%",
    changeType: "positive",
    icon: Building2,
  },
  {
    name: "Durchschnittliche Zufriedenheit",
    value: "4.2",
    change: "+0.3",
    changeType: "positive",
    icon: TrendingUp,
  },
]

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.name} className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <stat.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.name}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-semibold">{stat.value}</p>
                <span className={cn(
                  "text-sm",
                  stat.changeType === "positive" && "text-green-600",
                  stat.changeType === "negative" && "text-red-600",
                  stat.changeType === "neutral" && "text-gray-600"
                )}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
} 