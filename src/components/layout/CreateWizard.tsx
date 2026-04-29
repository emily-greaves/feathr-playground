import { useState } from 'react'
import { X, ChevronRight, ChevronLeft, Target, Mail, Users, FileText, Eye, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CreateWizardProps {
  open: boolean
  onClose: () => void
}

const wizardSteps = [
  { id: 'goal', title: 'Goal', icon: Target, description: 'What do you want to achieve?' },
  { id: 'channel', title: 'Channel', icon: Mail, description: 'How will you reach your audience?' },
  { id: 'audience', title: 'Audience', icon: Users, description: 'Who do you want to reach?' },
  { id: 'content', title: 'Content', icon: FileText, description: 'What will you say?' },
  { id: 'review', title: 'Review', icon: Eye, description: 'Review your campaign' },
  { id: 'publish', title: 'Publish', icon: Send, description: 'Launch your campaign' },
]

export function CreateWizard({ open, onClose }: CreateWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)

  if (!open) return null

  const step = wizardSteps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === wizardSteps.length - 1

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    setCurrentStep(0)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-background rounded-lg shadow-lg w-full max-w-2xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Create Campaign</h2>
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {wizardSteps.length}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            {wizardSteps.map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors',
                    index < currentStep && 'bg-primary text-primary-foreground',
                    index === currentStep && 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2',
                    index > currentStep && 'bg-muted text-muted-foreground'
                  )}
                >
                  {index < currentStep ? (
                    <span className="text-xs">✓</span>
                  ) : (
                    index + 1
                  )}
                </div>
                {index < wizardSteps.length - 1 && (
                  <div
                    className={cn(
                      'w-8 h-0.5 mx-1',
                      index < currentStep ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {wizardSteps.map((s) => (
              <span key={s.id} className="text-xs text-muted-foreground w-8 text-center">
                {s.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="px-6 py-8 min-h-[300px]">
          <div className="flex flex-col items-center text-center">
            {step && (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-6">{step.description}</p>

                {/* Placeholder content */}
                <div className="w-full max-w-md p-8 border-2 border-dashed rounded-lg bg-muted/20">
                  <p className="text-sm text-muted-foreground">
                    {step.id === 'goal' && 'Choose your campaign goal: Awareness, Engagement, Donations, or Events'}
                    {step.id === 'channel' && 'Select a channel: Email, Display Ads, Social, or Search'}
                    {step.id === 'audience' && 'Choose existing segments or create a new audience'}
                    {step.id === 'content' && 'Create your message with our templates or start fresh'}
                    {step.id === 'review' && 'Preview your campaign and make final adjustments'}
                    {step.id === 'publish' && 'Set your schedule and launch your campaign'}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/30">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstStep}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            {step?.title}
          </div>

          {isLastStep ? (
            <Button onClick={handleClose}>
              Finish
              <Send className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
