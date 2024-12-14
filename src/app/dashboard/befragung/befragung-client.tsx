'use client'

import { useState, useEffect } from 'react'
import { IntroPage } from '@/components/survey/intro-page'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProgressBar } from '@/components/survey/progress-bar'
import { StarRating } from '@/components/survey/star-rating'
import { toast } from 'sonner'
import { Dices } from 'lucide-react'

// Import all table data
import fragenData from '@/app/data/tbl_Frage.json'
import lehrerData from '@/app/data/tbl_Lehrer.json'
import klassenData from '@/app/data/tbl_Klasse.json'
import abteilungenData from '@/app/data/tbl_Abteilung.json'

interface Frage {
  fra_FrageID: number
  fra_Nr: number
  fra_Text: string
  fra_sichtbar: boolean
  frar_FrageArtID: number
  frt_FrageTypID: number
  fra_aufAbt_sichtbar: boolean
}

interface Lehrer {
  leh_LehrerID: number
  leh_Name: string
  leh_Vorname: string
  leh_EMail: string
  leh_Status: string | null
  leh_LoginName: string
  leh_IndividuelleFragen: string | null
  abt_AbteilungID: number | null
}

interface Klasse {
  kla_KlasseID: number
  kla_Bezeichnung: string
  abt_AbteilungID: number
}

interface Abteilung {
  abt_AbteilungID: number
  abt_Bezeichnung: string
  abt_Kurzbezeichnung: string
}

interface Answer {
  questionId: number
  teacherId: number
  rating: number
  noAnswer?: boolean
}

const QUESTIONS_PER_PAGE = 1

type Step = 'intro' | 'class-select' | 'survey' | 'complete'

export default function BefragungClient() {
  const [currentStep, setCurrentStep] = useState<Step>('intro')
  const [accessCode, setAccessCode] = useState<string>('')
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [answers, setAnswers] = useState<Answer[]>([])
  const [currentPage, setCurrentPage] = useState(0)

  // Get data from JSON files
  const allQuestions = fragenData.resource as Frage[]
  const allTeachers = lehrerData.resource as Lehrer[]
  const classes = klassenData.resource as Klasse[]
  const departments = abteilungenData.resource as Abteilung[]

  // Get selected class details
  const selectedClassDetails = classes.find(c => c.kla_Bezeichnung === selectedClass)
  
  // Get teachers for the selected class's department
  const classTeachers = selectedClassDetails
    ? allTeachers.filter(t => 
        t.abt_AbteilungID === selectedClassDetails.abt_AbteilungID || 
        t.abt_AbteilungID === null // Include teachers without department assignment
      )
    : []

  // Filter questions based on selected class's department
  const questions = allQuestions
    .filter(q => q.fra_sichtbar) // Only visible questions
    .sort((a, b) => a.fra_Nr - b.fra_Nr) // Sort by question number

  // Log for debugging
  useEffect(() => {
    if (selectedClass) {
      console.log('Selected Class:', selectedClass)
      console.log('Total Questions:', questions.length)
      console.log('Questions:', questions)
    }
  }, [selectedClass, questions])

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE)
  const currentQuestion = questions[currentPage]

  const handleStart = (code: string) => {
    setAccessCode(code)
    setCurrentStep('class-select')
  }

  const handleClassSelect = (classId: string) => {
    setSelectedClass(classId)
    setCurrentStep('survey')
    setCurrentPage(0) // Reset to first question when class changes
    setAnswers([]) // Reset answers when class changes
  }

  const handleRatingChange = (questionId: number, teacherId: number, rating: number) => {
    setAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(
        a => a.questionId === questionId && a.teacherId === teacherId
      )

      if (existingAnswerIndex > -1) {
        const newAnswers = [...prev]
        newAnswers[existingAnswerIndex] = {
          ...newAnswers[existingAnswerIndex],
          rating,
          noAnswer: false
        }
        return newAnswers
      }

      return [...prev, { questionId, teacherId, rating, noAnswer: false }]
    })
  }

  const handleNoAnswer = (questionId: number, teacherId: number) => {
    setAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(
        a => a.questionId === questionId && a.teacherId === teacherId
      )

      if (existingAnswerIndex > -1) {
        const newAnswers = [...prev]
        const currentAnswer = newAnswers[existingAnswerIndex]
        
        // Toggle noAnswer state
        const newNoAnswer = !currentAnswer.noAnswer
        
        newAnswers[existingAnswerIndex] = {
          ...currentAnswer,
          rating: newNoAnswer ? 0 : currentAnswer.rating,
          noAnswer: newNoAnswer
        }
        return newAnswers
      }

      return [...prev, { questionId, teacherId, rating: 0, noAnswer: true }]
    })
  }

  const handleRandomRatings = () => {
    classTeachers.forEach(teacher => {
      // Random rating between 1 and 5
      const randomRating = Math.floor(Math.random() * 5) + 1
      handleRatingChange(currentQuestion.fra_FrageID, teacher.leh_LehrerID, randomRating)
    })

    toast.success('Zufällige Bewertungen gesetzt')
  }

  const getAnswerForQuestionAndTeacher = (questionId: number, teacherId: number) => {
    return answers.find(
      a => a.questionId === questionId && a.teacherId === teacherId
    )
  }

  const handleNext = () => {
    // Check if all teachers are rated for the current question
    const allAnswered = classTeachers.every(teacher => {
      const answer = getAnswerForQuestionAndTeacher(currentQuestion.fra_FrageID, teacher.leh_LehrerID)
      return (answer && answer.rating > 0) || (answer && answer.noAnswer)
    })

    if (!allAnswered) {
      toast.error('Bitte bewerten Sie alle Lehrer für diese Frage oder wählen Sie "Keine Angabe"')
      return
    }

    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1)
    } else {
      setCurrentStep('complete')
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const progress = (currentPage + 1) / totalPages

  if (currentStep === 'intro') {
    return <IntroPage onStart={handleStart} />
  }

  if (currentStep === 'class-select') {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Klasse auswählen</h1>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Wählen Sie Ihre Klasse aus</label>
              <Select onValueChange={handleClassSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Bitte wählen..." />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.kla_KlasseID} value={cls.kla_Bezeichnung}>
                      {cls.kla_Bezeichnung}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (currentStep === 'complete') {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className="p-6 text-center">
          <h1 className="text-2xl font-semibold mb-4">Vielen Dank!</h1>
          <p className="text-gray-600 mb-6">
            Ihre Bewertungen wurden erfolgreich gespeichert.
          </p>
          <Button onClick={() => {
            setCurrentStep('class-select')
            setCurrentPage(0)
            setSelectedClass('')
            setAnswers([])
          }}>
            Weitere Bewertung abgeben
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="p-6">
        <div className="mb-6">
          <ProgressBar
            currentStep={currentPage + 1}
            totalSteps={totalPages}
            progress={progress}
          />
        </div>

        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-xl font-medium">
                Frage {currentPage + 1} von {totalPages}:
              </h3>
              <Button
                variant="outline"
                onClick={handleRandomRatings}
                className="flex items-center gap-2"
              >
                <Dices className="h-4 w-4" />
                Zufällige Bewertungen
              </Button>
            </div>
            <p className="text-lg">{currentQuestion.fra_Text}</p>
          </div>
          
          <div className="grid gap-6">
            {classTeachers.map((teacher) => (
              <div key={teacher.leh_LehrerID} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">
                    {teacher.leh_Vorname} {teacher.leh_Name}
                  </h4>
                  <div className="flex items-center gap-4">
                    <StarRating
                      value={!getAnswerForQuestionAndTeacher(currentQuestion.fra_FrageID, teacher.leh_LehrerID)?.noAnswer ? 
                        getAnswerForQuestionAndTeacher(currentQuestion.fra_FrageID, teacher.leh_LehrerID)?.rating || 0 : 0}
                      onChange={(rating) => handleRatingChange(currentQuestion.fra_FrageID, teacher.leh_LehrerID, rating)}
                      disabled={getAnswerForQuestionAndTeacher(currentQuestion.fra_FrageID, teacher.leh_LehrerID)?.noAnswer}
                    />
                    <Button
                      variant={getAnswerForQuestionAndTeacher(currentQuestion.fra_FrageID, teacher.leh_LehrerID)?.noAnswer ? "default" : "outline"}
                      onClick={() => handleNoAnswer(currentQuestion.fra_FrageID, teacher.leh_LehrerID)}
                      className="whitespace-nowrap"
                    >
                      Keine Angabe
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            Zurück
          </Button>
          <Button
            onClick={handleNext}
          >
            {currentPage === totalPages - 1 ? 'Abschließen' : 'Weiter'}
          </Button>
        </div>
      </Card>
    </div>
  )
} 