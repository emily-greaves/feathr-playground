# Stepper Component Redesign

## Problem

The current horizontal stepper has issues:
- Text wrapping is inconsistent across steps with varying label lengths
- Alignment problems due to different description lengths
- 7-8 step campaigns don't fit well on narrower screens
- The dropdown/accordion alternative received negative feedback

## Design Decision

Adopt a three-zone horizontal layout with progressive collapse for responsiveness.

## Layout

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Creatives          ✓ ─ ✓ ─ ③ ─ 4 ─ 5 ─ 6 ─ 7 ─ 8          [+ Button ▼] │
│  Step 3 of 8                                                             │
└──────────────────────────────────────────────────────────────────────────┘
```

**Three zones:**
- **Left:** Step title (bold) + "Step X of Y" subtitle
- **Center:** Minimal numbered circles with short connectors
- **Right:** Optional step-specific action button (e.g., "+ Add creatives")

### Step Indicators

| State | Appearance |
|-------|------------|
| Completed | Green outline circle with checkmark |
| Current | Filled dark/teal circle with number |
| Upcoming | Gray outline circle with number, reduced opacity |

### Connectors

Short dashes (approximately 12px) between circles. Connectors do not change color based on completion — they remain neutral.

## Responsive Behavior

Progressive collapse strategy:

| Breakpoint | Behavior |
|------------|----------|
| 1040px+ | Full layout with connectors |
| ~800px | Remove connectors, reduce circle size/spacing |
| ~600px | Show window: previous step + current + next + "···" indicator |

At narrowest widths, the ellipsis ("···") indicates additional steps exist. Users can still see their position via the "Step X of Y" text.

## Interaction

### Navigation
- **Completed steps:** Clickable — navigates back to that step
- **Current step:** Not clickable (already there)
- **Upcoming steps:** Not clickable — must progress sequentially

### Action Button
- Appears only on steps that have a step-specific action
- Not all steps will show an action button
- Button includes dropdown chevron when it has multiple options

## Component API

```tsx
interface StepperProps {
  steps: Step[]
  currentStep: number
  onStepChange: (step: number) => void
  action?: React.ReactNode  // Optional step-specific action
}

interface Step {
  id: string
  label: string
}
```

The `action` prop allows passing a custom button/dropdown for step-specific actions. When not provided, the right zone is empty.

## Files to Modify

| File | Change |
|------|--------|
| `src/components/ui/stepper.tsx` | Rewrite stepper component with new layout |
| `src/components/layout/CreateCampaignWizard.tsx` | Update to use new stepper API |

## Accessibility

- Step indicators use `role="button"` and `tabIndex={0}` for completed steps
- `aria-current="step"` on current step
- `aria-disabled="true"` on upcoming steps
- Keyboard navigation: Tab through completed steps, Enter/Space to select

## Out of Scope

- Vertical stepper variant (may add later)
- Step descriptions/tooltips on hover (not needed with title always visible)
- Animated transitions between responsive breakpoints
