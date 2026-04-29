import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type StepStatus = 'completed' | 'current' | 'upcoming'

export interface Step {
  id: string
  label: string
}

interface StepperContextValue {
  currentStep: number
  totalSteps: number
  steps: Step[]
  goToStep: (step: number) => void
  getStepStatus: (index: number) => StepStatus
}

const StepperContext = React.createContext<StepperContextValue | null>(null)

function useStepperContext() {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error('Stepper components must be used within a Stepper')
  }
  return context
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  onStepChange?: (step: number) => void
  action?: React.ReactNode
  className?: string
}

function Stepper({ steps, currentStep, onStepChange, action, className }: StepperProps) {
  const totalSteps = steps.length
  const currentStepData = steps[currentStep]

  const goToStep = React.useCallback(
    (step: number) => {
      if (step < currentStep && onStepChange) {
        onStepChange(step)
      }
    },
    [currentStep, onStepChange]
  )

  const getStepStatus = React.useCallback(
    (index: number): StepStatus => {
      if (index < currentStep) return 'completed'
      if (index === currentStep) return 'current'
      return 'upcoming'
    },
    [currentStep]
  )

  return (
    <StepperContext.Provider value={{ currentStep, totalSteps, steps, goToStep, getStepStatus }}>
      <nav aria-label="Progress" className={cn('w-full', className)}>
        {/* Grid ensures center stays centered regardless of left/right content width */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Left: Title + Step count */}
          <div>
            <h2 className="text-base font-semibold">{currentStepData?.label}</h2>
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </p>
          </div>

          {/* Center: Step indicators */}
          <div className="flex items-center justify-center gap-1.5 md:gap-2">
            {steps.map((step, index) => (
              <StepIndicator key={step.id} step={index} isLast={index === totalSteps - 1} />
            ))}
          </div>

          {/* Right: Action (optional) */}
          <div className="flex justify-end">
            {action}
          </div>
        </div>
      </nav>
    </StepperContext.Provider>
  )
}

interface StepIndicatorProps {
  step: number
  isLast: boolean
}

function StepIndicator({ step, isLast }: StepIndicatorProps) {
  const { goToStep, getStepStatus } = useStepperContext()
  const status = getStepStatus(step)

  const handleClick = () => {
    if (status === 'completed') {
      goToStep(step)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && status === 'completed') {
      e.preventDefault()
      goToStep(step)
    }
  }

  return (
    <>
      <div
        role={status === 'completed' ? 'button' : undefined}
        tabIndex={status === 'completed' ? 0 : undefined}
        aria-current={status === 'current' ? 'step' : undefined}
        aria-disabled={status === 'upcoming' ? true : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all',
          status === 'completed' && [
            'border-2 border-green-500 text-green-500',
            'cursor-pointer hover:bg-green-500/10',
          ],
          status === 'current' && 'bg-cyan-600 text-white',
          status === 'upcoming' && 'border-2 border-muted-foreground/30 text-muted-foreground/50'
        )}
      >
        {status === 'completed' ? (
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <span>{step + 1}</span>
        )}
      </div>
      {/* Connector - hidden on small screens */}
      {!isLast && (
        <div className="hidden md:block w-5 h-0.5 bg-muted-foreground/30" />
      )}
    </>
  )
}

interface StepperContentProps {
  step: number
  currentStep: number
  children: React.ReactNode
  className?: string
}

function StepperContent({ step, currentStep, children, className }: StepperContentProps) {
  if (step !== currentStep) {
    return null
  }

  return <div className={className}>{children}</div>
}

// Legacy exports for backwards compatibility during migration
interface LegacyStepperItemProps {
  step: number
  label: string
  description?: string
}

function StepperItem(_props: LegacyStepperItemProps) {
  // This component is no longer used - steps are passed as data to Stepper
  // Keeping for backwards compatibility during migration
  return null
}

export { Stepper, StepperItem, StepperContent, useStepperContext }
