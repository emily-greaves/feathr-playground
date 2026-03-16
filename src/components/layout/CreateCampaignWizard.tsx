import { useState } from 'react'
import { FileText, ArrowLeft, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Stepper, StepperItem, StepperContent } from '@/components/ui/stepper'

interface CreateCampaignWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const WIZARD_STEPS = [
  { id: 'basics', label: 'Basics', description: 'Campaign details' },
  { id: 'audience', label: 'Audience', description: 'Target segments' },
  { id: 'content', label: 'Content', description: 'Creative assets' },
  { id: 'schedule', label: 'Schedule', description: 'Timing & budget' },
  { id: 'review', label: 'Review', description: 'Confirm & launch' },
]

function StepPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export function CreateCampaignWizard({ open, onOpenChange }: CreateCampaignWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === WIZARD_STEPS.length - 1

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  const handleComplete = () => {
    toast.success('Campaign created successfully')
    setCurrentStep(0)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) setCurrentStep(0)
      onOpenChange(isOpen)
    }}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col gap-0 p-0">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Create a campaign</DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <div className="px-6 py-4 border-b bg-muted/30">
          <Stepper currentStep={currentStep} onStepChange={handleStepChange}>
            {WIZARD_STEPS.map((step, index) => (
              <StepperItem
                key={step.id}
                step={index}
                label={step.label}
                description={step.description}
              />
            ))}
          </Stepper>
        </div>

        {/* Content area */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6">
          <StepperContent step={0} currentStep={currentStep}>
            <StepPlaceholder
              title="Campaign Basics"
              description="Configure the fundamental settings for your campaign including name, type, and objectives."
            />
          </StepperContent>

          <StepperContent step={1} currentStep={currentStep}>
            <StepPlaceholder
              title="Target Audience"
              description="Define who should see your campaign by selecting segments, demographics, or custom audiences."
            />
          </StepperContent>

          <StepperContent step={2} currentStep={currentStep}>
            <StepPlaceholder
              title="Campaign Content"
              description="Upload creative assets, write copy, and design the visual elements of your campaign."
            />
          </StepperContent>

          <StepperContent step={3} currentStep={currentStep}>
            <StepPlaceholder
              title="Schedule & Budget"
              description="Set your campaign timeline, daily budget, and bid strategy for optimal delivery."
            />
          </StepperContent>

          <StepperContent step={4} currentStep={currentStep}>
            <StepPlaceholder
              title="Review & Launch"
              description="Review all campaign settings and launch when ready. You can also save as draft."
            />
          </StepperContent>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-background">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {WIZARD_STEPS.length}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isFirstStep}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              {isLastStep ? (
                <Button onClick={handleComplete}>
                  Create campaign
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
