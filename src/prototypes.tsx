import { ReactNode } from 'react'
import { AppLayout } from '@/components/layout'
import Home from '@/pages/Home'
import UsabilityConcepts from '@/pages/UsabilityConcepts'

export interface Prototype {
  slug: string
  title: string
  description: string
  branch: string
  mergedAt: string
  render: () => ReactNode
}

export const prototypes: Prototype[] = [
  {
    slug: 'navigation',
    title: 'Navigation',
    description:
      'Sidebar IA with accordion groups, project favoriting, breadcrumbs, command palette, account switcher, and a Create dropdown. Includes the create project dialog and full-screen campaign wizard with redesigned stepper.',
    branch: 'feature/create-project-and-campaign-wizard',
    mergedAt: '2026-04-28',
    render: () => (
      <AppLayout>
        <Home />
      </AppLayout>
    ),
  },
  {
    slug: 'usability-concepts',
    title: 'Usability Concepts',
    description:
      'Four IA variations rendered side-by-side via a runtime concept switcher: current navigation (baseline), task-based flat nav with project as filter, progressive (adapts to new vs mature users), and a simplified hybrid. Use the floating switcher in the bottom-right to toggle between concepts.',
    branch: 'usability-concept-prototype',
    mergedAt: '2026-04-28',
    render: () => <UsabilityConcepts />,
  },
]

export function getPrototype(slug: string): Prototype | undefined {
  return prototypes.find((p) => p.slug === slug)
}
