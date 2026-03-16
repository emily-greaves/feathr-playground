import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type StepStatus = 'completed' | 'current' | 'upcoming'

export interface Step {
  id: string
  label: string
  description?: string
}

interface StepperContextValue {
  currentStep: number
  totalSteps: number
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
  currentStep: number
  onStepChange?: (step: number) => void
  children: React.ReactNode
  className?: string
}

function Stepper({ currentStep, onStepChange, children, className }: StepperProps) {
  const steps = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === StepperItem
  )
  const totalSteps = steps.length

  const goToStep = React.useCallback(
    (step: number) => {
      // Only allow going to completed steps or current step
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
    <StepperContext.Provider value={{ currentStep, totalSteps, goToStep, getStepStatus }}>
      <nav aria-label="Progress" className={className}>
        <ol className="flex items-center">{children}</ol>
      </nav>
    </StepperContext.Provider>
  )
}

interface StepperItemProps {
  step: number
  label: string
  description?: string
}

function StepperItem({ step, label, description }: StepperItemProps) {
  const { totalSteps, goToStep, getStepStatus } = useStepperContext()
  const status = getStepStatus(step)
  const isLast = step === totalSteps - 1

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
    <li className={cn('relative flex items-center', !isLast && 'flex-1')}>
      <div
        role={status === 'completed' ? 'button' : undefined}
        tabIndex={status === 'completed' ? 0 : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center gap-3 group',
          status === 'completed' && 'cursor-pointer'
        )}
      >
        {/* Step indicator */}
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all',
            status === 'completed' && [
              'border-primary bg-primary text-primary-foreground',
              'group-hover:bg-primary/90',
            ],
            status === 'current' && 'border-primary bg-primary text-primary-foreground',
            status === 'upcoming' && 'border-muted-foreground/30 bg-background text-muted-foreground'
          )}
        >
          {status === 'completed' ? (
            <Check className="h-5 w-5" aria-hidden="true" />
          ) : (
            <span>{step + 1}</span>
          )}
        </div>

        {/* Step label */}
        <div className="hidden sm:block min-w-0">
          <p
            className={cn(
              'text-sm font-medium transition-colors',
              status === 'completed' && 'text-foreground group-hover:text-primary',
              status === 'current' && 'text-foreground',
              status === 'upcoming' && 'text-muted-foreground'
            )}
          >
            {label}
          </p>
          {description && (
            <p
              className={cn(
                'text-xs transition-colors',
                status === 'upcoming' ? 'text-muted-foreground/60' : 'text-muted-foreground'
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Connector line */}
      {!isLast && (
        <div className="flex-1 mx-4">
          <div
            className={cn(
              'h-0.5 w-full transition-colors',
              status === 'completed' ? 'bg-primary' : 'bg-muted-foreground/30'
            )}
          />
        </div>
      )}
    </li>
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

export { Stepper, StepperItem, StepperContent, useStepperContext }
