'use client'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  progress: number
}

export function ProgressBar({ currentStep, totalSteps, progress }: ProgressBarProps) {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-blue-600">
          FORTSCHRITT: FRAGE {currentStep} VON {totalSteps}
        </span>
        <span>{Math.round(progress * 100)}%</span>
      </div>
      <div className="w-full h-2 bg-blue-100 rounded-full">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  )
} 