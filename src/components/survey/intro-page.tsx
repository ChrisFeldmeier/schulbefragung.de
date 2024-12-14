'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface IntroPageProps {
  onStart: (accessCode: string) => void
}

export function IntroPage({ onStart }: IntroPageProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const accessCode = formData.get('accessCode') as string
    onStart(accessCode)
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Warum machen wir eine Schülerbefragung?</h1>
          
          <h2 className="text-xl font-medium mt-6">Liebe Schülerinnen, liebe Schüler,</h2>
          
          <p className="text-gray-600">
            die Karl-Peter-Obermaier-Schule hat sich ein hohes Ziel gesetzt: Sie möchte ihre Schüler bestens auf ihr Berufsleben vorbereiten. Um diesem Anspruch gerecht zu werden, muss sich die Schule Gedanken machen, wie sie noch besser werden kann. Dazu brauchen wir Ihre Mithilfe.
          </p>

          <h3 className="text-lg font-medium mt-4">Wir wollen Ihre ehrliche Meinung!</h3>
          
          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <p className="text-sm text-gray-600">
              Die Befragung ist freiwillig. Lesen sie die Fragen genau durch und nehmen sie sich Zeit sie gewissenhaft zu beantworten.
            </p>
            <p className="text-sm text-gray-600">
              Jede Frage kann von "trifft voll" zu bis "trifft nicht zu" bewertet werden.
            </p>
            <p className="text-sm text-gray-600">
              Es sollen alle Fragen beantwortet werden. Falls sie zu einer Frage überhaupt keine Meinung haben, besteht auch die Möglichkeit diese auszulassen.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Zur Datensicherheit:</h4>
            <p className="text-sm text-gray-600">
              Die Befragung ist anonym. Die Daten werden ausschließlich für schulische Zwecke verwendet.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Zugangsdaten</label>
            <Input
              name="accessCode"
              placeholder="Zugangscode eingeben"
              required
            />
            <p className="text-sm text-gray-500">
              Beispiel Zugangscode zum Testen: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">12345</span>
            </p>
          </div>
          <Button type="submit" className="w-full">
            Befragung starten
          </Button>
        </form>
      </Card>
    </div>
  )
} 