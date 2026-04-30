import { campaignTypeConfigs, flightConfig, type CampaignType } from '@/lib/campaignTypes'
import { cn } from '@/lib/utils'

interface CampaignTypePillProps {
  type: CampaignType | 'flight'
  size?: 'sm' | 'md'
  className?: string
}

export function CampaignTypePill({ type, size = 'md', className }: CampaignTypePillProps) {
  const config = type === 'flight' ? flightConfig : campaignTypeConfigs[type]
  const Icon = config.icon
  const label = config.label

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap',
        config.bgClass,
        config.textClass,
        type === 'flight' && 'border border-dashed border-neutral-300 dark:border-neutral-600',
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-2.5 py-1 text-xs',
        className
      )}
    >
      <Icon className={cn(size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')} />
      {label}
    </span>
  )
}
