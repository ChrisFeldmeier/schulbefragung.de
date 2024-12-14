import { Card } from "@/components/ui/card"
import { DepartmentOverview } from "@/components/dashboard/department-overview"
import { SatisfactionTrends } from "@/components/dashboard/satisfaction-trends"
import { TeacherStats } from "@/components/dashboard/teacher-stats"
import { QuickStats } from "@/components/dashboard/quick-stats"
import { CategorySatisfaction } from "@/components/dashboard/category-satisfaction"
import { FacilityFeedback } from "@/components/dashboard/facility-feedback"
import { BusinessRelations } from "@/components/dashboard/business-relations"

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-4">
          <select className="px-3 py-1 border rounded-md">
            <option>2023/2024</option>
            <option>2022/2023</option>
            <option>2021/2022</option>
          </select>
        </div>
      </div>

      <QuickStats />

      {/* First row - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Zufriedenheit nach Kategorien</h2>
          <CategorySatisfaction />
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Abteilungszufriedenheit</h2>
          <DepartmentOverview />
        </Card>
      </div>

      {/* Second row - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Entwicklung über Zeit</h2>
          <SatisfactionTrends />
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Beziehung zu Ausbildungsbetrieben</h2>
          <BusinessRelations />
        </Card>
      </div>

      {/* Third row - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Einrichtung & Ressourcen</h2>
          <FacilityFeedback />
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Lehrerstatistiken</h2>
          <TeacherStats />
        </Card>
      </div>
    </div>
  )
}