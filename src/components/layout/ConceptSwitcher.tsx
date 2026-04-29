import { useState } from 'react'
import { ChevronDown, ChevronUp, X, FlaskConical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useConcept, Concept } from './ConceptContext'

const concepts: { id: Concept; label: string; description: string }[] = [
  {
    id: 'current',
    label: 'Current (Baseline)',
    description: 'Existing dual-sidebar with project mode',
  },
  {
    id: 'task-based',
    label: 'Task-Based',
    description: 'Project as filter, flat navigation',
  },
  {
    id: 'progressive',
    label: 'Progressive Disclosure',
    description: 'Guided onboarding, unlockable features',
  },
  {
    id: 'simplified-hybrid',
    label: 'Simplified Hybrid',
    description: 'Home, Campaigns, People, Settings',
  },
]

export function ConceptSwitcher() {
  const { activeConcept, userMaturity, setActiveConcept, setUserMaturity } = useConcept()
  const [isExpanded, setIsExpanded] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 shadow-lg bg-background"
      >
        <FlaskConical className="h-4 w-4 mr-2" />
        Show Concept Switcher
      </Button>
    )
  }

  const activeConceptLabel = concepts.find(c => c.id === activeConcept)?.label || 'Current'

  return (
    <div className="fixed bottom-4 right-4 z-50 w-72 bg-background border rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Concept Switcher</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronUp className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Collapsed state - show active concept badge */}
      {!isExpanded && (
        <div className="px-3 py-2">
          <div className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
            {activeConceptLabel}
          </div>
        </div>
      )}

      {/* Expanded content */}
      {isExpanded && (
        <div className="p-3 space-y-3">
          {/* Concept options */}
          <div className="space-y-2">
            {concepts.map((concept) => (
              <label
                key={concept.id}
                className={cn(
                  'flex items-start gap-3 p-2 rounded-md cursor-pointer transition-colors',
                  'hover:bg-muted/50',
                  activeConcept === concept.id && 'bg-primary/10 ring-1 ring-primary/20'
                )}
              >
                <input
                  type="radio"
                  name="concept"
                  value={concept.id}
                  checked={activeConcept === concept.id}
                  onChange={() => setActiveConcept(concept.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{concept.label}</div>
                  <div className="text-xs text-muted-foreground">{concept.description}</div>
                </div>
              </label>
            ))}
          </div>

          {/* Maturity toggle - only for Progressive concept */}
          {activeConcept === 'progressive' && (
            <div className="pt-2 border-t">
              <label className="text-xs text-muted-foreground mb-2 block">
                User Maturity Level
              </label>
              <div className="flex rounded-md border overflow-hidden">
                <button
                  onClick={() => setUserMaturity('new')}
                  className={cn(
                    'flex-1 px-3 py-1.5 text-xs font-medium transition-colors',
                    userMaturity === 'new'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background hover:bg-muted'
                  )}
                >
                  New User
                </button>
                <button
                  onClick={() => setUserMaturity('mature')}
                  className={cn(
                    'flex-1 px-3 py-1.5 text-xs font-medium transition-colors border-l',
                    userMaturity === 'mature'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background hover:bg-muted'
                  )}
                >
                  Mature User
                </button>
              </div>
            </div>
          )}

          {/* Active concept badge */}
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Active:</span>
              <div className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                {activeConceptLabel}
                {activeConcept === 'progressive' && ` (${userMaturity === 'new' ? 'New' : 'Mature'})`}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
