import { useState } from 'react'
import { ChevronDown, MoreHorizontal, Plane } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { StatusPill } from './StatusPill'
import { CampaignTypePill } from './CampaignTypePill'
import { cn } from '@/lib/utils'
import { flightConfig } from '@/lib/campaignTypes'
import type { Flight, Campaign } from '@/data/sampleCampaigns'
import { getProjectName, getCampaignsForFlight } from '@/data/sampleCampaigns'

interface FlightCardProps {
  flight: Flight
}

export function FlightCard({ flight }: FlightCardProps) {
  const [expanded, setExpanded] = useState(false)
  const childCampaigns = getCampaignsForFlight(flight.id)

  return (
    <div className="relative">
      {/* Stacked card effect */}
      <div className="absolute inset-0 top-1 left-1 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-600 bg-muted/20" />
      <div className="absolute inset-0 top-0.5 left-0.5 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-600 bg-muted/30" />

      <Card
        className={cn(
          'relative group cursor-pointer hover:border-primary/50 hover:shadow-md transition-all',
          'border-dashed border-neutral-300 dark:border-neutral-600'
        )}
        onClick={() => setExpanded(!expanded)}
      >
        <CardContent className="p-4 flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium border border-dashed',
                flightConfig.bgClass,
                flightConfig.textClass,
                flightConfig.borderClass
              )}
            >
              <Plane className="h-3 w-3" />
              Flight · {childCampaigns.length} campaigns
            </span>
            <StatusPill status={flight.status} />
          </div>

          {/* Title */}
          <div>
            <h3 className="font-semibold text-sm leading-tight">{flight.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{getProjectName(flight.projectId)}</p>
          </div>

          {/* Campaign type pills preview */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {childCampaigns.map((c) => (
              <CampaignTypePill key={c.id} type={c.type} size="sm" />
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-1 border-t border-border/50">
            <span className="text-xs text-muted-foreground">{flight.createdDate}</span>
            <div className="flex items-center gap-1">
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 text-muted-foreground transition-transform',
                  expanded && 'rotate-180'
                )}
              />
              <button
                className="rounded-md p-1 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expanded child campaigns */}
      {expanded && (
        <div className="mt-2 ml-4 space-y-2">
          {childCampaigns.map((campaign) => (
            <MiniCampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  )
}

function MiniCampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-border/50 bg-background p-2.5">
      <CampaignTypePill type={campaign.type} size="sm" />
      <span className="text-sm font-medium flex-1 truncate">{campaign.name}</span>
      <StatusPill status={campaign.status} />
    </div>
  )
}
