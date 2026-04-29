import { MoreHorizontal } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { CampaignTypePill } from './CampaignTypePill'
import { StatusPill } from './StatusPill'
import type { Campaign } from '@/data/sampleCampaigns'
import { getProjectName } from '@/data/sampleCampaigns'

interface CampaignCardProps {
  campaign: Campaign
}

function formatNumber(value: number | undefined): string {
  if (value === undefined) return '—'
  if (value === 0) return '0'
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`
  return value.toLocaleString()
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all">
      <CardContent className="p-4 flex flex-col gap-3">
        {/* Header: type pill + status */}
        <div className="flex items-center justify-between">
          <CampaignTypePill type={campaign.type} size="sm" />
          <StatusPill status={campaign.status} />
        </div>

        {/* Title + project */}
        <div>
          <h3 className="font-semibold text-sm leading-tight">{campaign.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{getProjectName(campaign.projectId)}</p>
        </div>

        {/* Metrics */}
        {(campaign.views || campaign.clicks) && (
          <div className="flex items-center gap-3 text-xs">
            {campaign.views !== undefined && (
              <span className="text-muted-foreground">
                {formatNumber(campaign.views)} <span className="text-muted-foreground/60">views</span>
              </span>
            )}
            {campaign.clicks !== undefined && (
              <>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">
                  {formatNumber(campaign.clicks)} <span className="text-muted-foreground/60">clicks</span>
                </span>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-border/50">
          <span className="text-xs text-muted-foreground">{campaign.createdDate}</span>
          <button className="rounded-md p-1 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted transition-all">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
