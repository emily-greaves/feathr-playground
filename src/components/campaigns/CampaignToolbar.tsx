import { useState, useRef, useEffect } from 'react'
import { Search, Settings, LayoutGrid, List, FolderKanban, SlidersHorizontal, X, Columns3 } from 'lucide-react'
import { allCampaignTypes, type CampaignType, type CampaignStatus, statusConfig } from '@/lib/campaignTypes'
import { cn } from '@/lib/utils'
import type { ColumnDef } from '@/lib/columnConfig'

export type ViewMode = 'table' | 'cards'

interface CampaignToolbarProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedTypes: CampaignType[]
  onTypeToggle: (type: CampaignType) => void
  selectedStatuses: CampaignStatus[]
  onStatusToggle: (status: CampaignStatus) => void
  groupByProject: boolean
  onGroupByProjectToggle: () => void
  hiddenColumns: ColumnDef[]
  visibleColumnIds: string[]
  onToggleColumn: (columnId: string) => void
}

function FilterPopover({
  selectedTypes,
  onTypeToggle,
  selectedStatuses,
  onStatusToggle,
}: {
  selectedTypes: CampaignType[]
  onTypeToggle: (type: CampaignType) => void
  selectedStatuses: CampaignStatus[]
  onStatusToggle: (status: CampaignStatus) => void
}) {
  const [open, setOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  const activeFilterCount = selectedTypes.length + selectedStatuses.length

  // Close on click outside
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          open || activeFilterCount > 0
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        )}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {activeFilterCount > 0 && (
          <span className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-foreground/20 px-1.5 text-xs font-semibold">
            {activeFilterCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-2 w-80 rounded-lg border border-border bg-popover p-4 shadow-lg">
          {/* Type section */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Campaign Type</span>
              {selectedTypes.length > 0 && (
                <button
                  onClick={() => selectedTypes.forEach(onTypeToggle)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {allCampaignTypes.map((typeConfig) => {
                const isSelected = selectedTypes.includes(typeConfig.id)
                const Icon = typeConfig.icon
                return (
                  <button
                    key={typeConfig.id}
                    onClick={() => onTypeToggle(typeConfig.id)}
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
                      isSelected
                        ? `${typeConfig.bgClass} ${typeConfig.textClass}`
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    {typeConfig.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="mb-4 h-px bg-border" />

          {/* Status section */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</span>
              {selectedStatuses.length > 0 && (
                <button
                  onClick={() => selectedStatuses.forEach(onStatusToggle)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(statusConfig) as CampaignStatus[]).map((status) => {
                const config = statusConfig[status]
                const isSelected = selectedStatuses.includes(status)
                return (
                  <button
                    key={status}
                    onClick={() => onStatusToggle(status)}
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
                      isSelected
                        ? `${config.bgClass} ${config.textClass}`
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    )}
                  >
                    {config.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ColumnPicker({
  hiddenColumns,
  visibleColumnIds,
  onToggleColumn,
}: {
  hiddenColumns: ColumnDef[]
  visibleColumnIds: string[]
  onToggleColumn: (columnId: string) => void
}) {
  const [open, setOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  if (hiddenColumns.length === 0) return null

  const enabledCount = hiddenColumns.filter((c) => visibleColumnIds.includes(c.id)).length

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          open || enabledCount > 0
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        )}
      >
        <Columns3 className="h-4 w-4" />
        Columns
        {enabledCount > 0 && (
          <span className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-foreground/20 px-1.5 text-xs font-semibold">
            +{enabledCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-full right-0 z-50 mt-2 w-64 rounded-lg border border-border bg-popover p-3 shadow-lg">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Toggle columns
          </span>
          <div className="max-h-64 overflow-y-auto space-y-0.5">
            {hiddenColumns.map((col) => {
              const isOn = visibleColumnIds.includes(col.id)
              return (
                <label
                  key={col.id}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted/50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => onToggleColumn(col.id)}
                    className="rounded border-border"
                  />
                  {col.label}
                </label>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export function CampaignToolbar({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
  selectedTypes,
  onTypeToggle,
  selectedStatuses,
  onStatusToggle,
  groupByProject,
  onGroupByProjectToggle,
  hiddenColumns,
  visibleColumnIds,
  onToggleColumn,
}: CampaignToolbarProps) {
  // Collect active filter labels for the summary chips
  const activeFilterChips: { label: string; icon?: React.ComponentType<{ className?: string }>; onRemove: () => void; bgClass: string; textClass: string }[] = []

  for (const type of selectedTypes) {
    const config = allCampaignTypes.find((t) => t.id === type)
    if (config) {
      activeFilterChips.push({
        label: config.label,
        icon: config.icon,
        onRemove: () => onTypeToggle(type),
        bgClass: config.bgClass,
        textClass: config.textClass,
      })
    }
  }

  for (const status of selectedStatuses) {
    const config = statusConfig[status]
    activeFilterChips.push({
      label: config.label,
      onRemove: () => onStatusToggle(status),
      bgClass: config.bgClass,
      textClass: config.textClass,
    })
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Toolbar row */}
      <div className="flex items-center gap-3">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        <FilterPopover
          selectedTypes={selectedTypes}
          onTypeToggle={onTypeToggle}
          selectedStatuses={selectedStatuses}
          onStatusToggle={onStatusToggle}
        />

        <button
          onClick={onGroupByProjectToggle}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            groupByProject
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          <FolderKanban className="h-4 w-4" />
          Group by project
        </button>

        <div className="flex-1" />

        <div className="flex items-center rounded-md border border-input">
          <button
            onClick={() => onViewModeChange('table')}
            className={cn(
              'inline-flex items-center justify-center rounded-l-md px-2.5 py-2 transition-colors',
              viewMode === 'table'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            )}
            aria-label="Table view"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange('cards')}
            className={cn(
              'inline-flex items-center justify-center rounded-r-md px-2.5 py-2 transition-colors',
              viewMode === 'cards'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            )}
            aria-label="Card view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>

        <ColumnPicker
          hiddenColumns={hiddenColumns}
          visibleColumnIds={visibleColumnIds}
          onToggleColumn={onToggleColumn}
        />

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors"
          aria-label="Campaign settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>

      {/* Active filter chips (shown below toolbar when filters are active) */}
      {activeFilterChips.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-muted-foreground mr-0.5">Filtered by:</span>
          {activeFilterChips.map((chip) => {
            const Icon = chip.icon
            return (
              <span
                key={chip.label}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full pl-2 pr-1 py-0.5 text-xs font-medium',
                  chip.bgClass,
                  chip.textClass
                )}
              >
                {Icon && <Icon className="h-3 w-3" />}
                {chip.label}
                <button
                  onClick={chip.onRemove}
                  className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  aria-label={`Remove ${chip.label} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
