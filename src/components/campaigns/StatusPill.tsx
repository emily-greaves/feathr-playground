import { statusConfig, type CampaignStatus } from '@/lib/campaignTypes'
import { cn } from '@/lib/utils'

interface StatusPillProps {
  status: CampaignStatus
  className?: string
}

export function StatusPill({ status, className }: StatusPillProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        config.bgClass,
        config.textClass,
        className
      )}
    >
      {config.label}
    </span>
  )
}
