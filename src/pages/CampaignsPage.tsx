import { useState, useMemo, useEffect } from 'react'
import { CampaignToolbar, type ViewMode } from '@/components/campaigns/CampaignToolbar'
import { CampaignTable } from '@/components/campaigns/CampaignTable'
import { CampaignGrid } from '@/components/campaigns/CampaignGrid'
import { sampleCampaigns, sampleFlights } from '@/data/sampleCampaigns'
import type { CampaignType, CampaignStatus } from '@/lib/campaignTypes'
import {
  getViewContext,
  getDefaultColumns,
  getAvailableHiddenColumns,
  getVisibleColumnDefs,
} from '@/lib/columnConfig'

interface CampaignsPageProps {
  typeFilter?: CampaignType
}

export default function CampaignsPage({ typeFilter }: CampaignsPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<CampaignType[]>(
    typeFilter ? [typeFilter] : []
  )
  const [selectedStatuses, setSelectedStatuses] = useState<CampaignStatus[]>([])
  const [groupByProject, setGroupByProject] = useState(true)

  // Column visibility state
  const viewContext = getViewContext(typeFilter)
  const defaultColumnIds = getDefaultColumns(viewContext)
  const hiddenColumns = getAvailableHiddenColumns(viewContext)

  const [extraColumnIds, setExtraColumnIds] = useState<string[]>([])

  // Reset extra columns when view context changes
  useEffect(() => {
    setExtraColumnIds([])
  }, [viewContext])

  // Sync sidebar type filter
  useEffect(() => {
    setSelectedTypes(typeFilter ? [typeFilter] : [])
  }, [typeFilter])

  const visibleColumnIds = useMemo(() => {
    return [...defaultColumnIds, ...extraColumnIds]
  }, [defaultColumnIds, extraColumnIds])

  const visibleColumnDefs = useMemo(() => {
    return getVisibleColumnDefs(visibleColumnIds)
  }, [visibleColumnIds])

  const handleToggleColumn = (columnId: string) => {
    setExtraColumnIds((prev) =>
      prev.includes(columnId) ? prev.filter((id) => id !== columnId) : [...prev, columnId]
    )
  }

  const handleTypeToggle = (type: CampaignType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const handleStatusToggle = (status: CampaignStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    )
  }

  const filteredCampaigns = useMemo(() => {
    return sampleCampaigns.filter((campaign) => {
      if (searchQuery && !campaign.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      if (selectedTypes.length > 0 && !selectedTypes.includes(campaign.type)) {
        return false
      }
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(campaign.status)) {
        return false
      }
      return true
    })
  }, [searchQuery, selectedTypes, selectedStatuses])

  const filteredFlights = useMemo(() => {
    return sampleFlights.filter((flight) => {
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(flight.status)) {
        return false
      }
      if (searchQuery && !flight.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      return true
    })
  }, [searchQuery, selectedStatuses])

  return (
    <div className="flex flex-col gap-4">
      <CampaignToolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTypes={selectedTypes}
        onTypeToggle={handleTypeToggle}
        selectedStatuses={selectedStatuses}
        onStatusToggle={handleStatusToggle}
        groupByProject={groupByProject}
        onGroupByProjectToggle={() => setGroupByProject(!groupByProject)}
        hiddenColumns={hiddenColumns}
        visibleColumnIds={visibleColumnIds}
        onToggleColumn={handleToggleColumn}
      />

      {viewMode === 'table' ? (
        <CampaignTable
          campaigns={filteredCampaigns}
          flights={filteredFlights}
          groupByProject={groupByProject}
          visibleColumns={visibleColumnDefs}
        />
      ) : (
        <CampaignGrid
          campaigns={filteredCampaigns}
          flights={filteredFlights}
          groupByProject={groupByProject}
        />
      )}
    </div>
  )
}
