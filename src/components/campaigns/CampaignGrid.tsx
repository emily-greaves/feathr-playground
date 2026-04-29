import { useState } from 'react'
import { ChevronRight, FolderKanban } from 'lucide-react'
import { CampaignCard } from './CampaignCard'
import { FlightCard } from './FlightCard'
import { cn } from '@/lib/utils'
import type { Campaign, Flight } from '@/data/sampleCampaigns'
import { getProjectName } from '@/data/sampleCampaigns'

interface CampaignGridProps {
  campaigns: Campaign[]
  flights: Flight[]
  groupByProject: boolean
}

function ProjectSection({ projectId, children }: { projectId: string; children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 mb-3 group"
      >
        <ChevronRight
          className={cn('h-4 w-4 text-muted-foreground transition-transform', expanded && 'rotate-90')}
        />
        <FolderKanban className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold">{getProjectName(projectId)}</span>
      </button>
      {expanded && children}
    </div>
  )
}

export function CampaignGrid({ campaigns, flights, groupByProject }: CampaignGridProps) {
  // Get standalone campaigns (not in a flight)
  const standaloneCampaigns = campaigns.filter((c) => !c.flightId)
  // Get flights that have visible campaigns
  const visibleFlights = flights.filter((f) =>
    f.campaignIds.some((id) => campaigns.find((c) => c.id === id))
  )

  const renderGrid = (projectCampaigns: Campaign[], projectFlights: Flight[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projectFlights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
      {projectCampaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  )

  if (!groupByProject) {
    return renderGrid(standaloneCampaigns, visibleFlights)
  }

  // Group by project
  const projectIds = [...new Set([
    ...standaloneCampaigns.map((c) => c.projectId),
    ...visibleFlights.map((f) => f.projectId),
  ])]

  return (
    <div className="space-y-6">
      {projectIds.map((projectId) => {
        const projectStandalone = standaloneCampaigns.filter((c) => c.projectId === projectId)
        const projectFlights = visibleFlights.filter((f) => f.projectId === projectId)

        return (
          <ProjectSection key={projectId} projectId={projectId}>
            {renderGrid(projectStandalone, projectFlights)}
          </ProjectSection>
        )
      })}
    </div>
  )
}
