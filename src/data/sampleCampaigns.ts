import type { CampaignType, CampaignStatus } from '@/lib/campaignTypes'

export interface Campaign {
  id: string
  name: string
  type: CampaignType
  status: CampaignStatus
  projectId: string
  flightId?: string
  // Dates
  createdDate: string
  startDate?: string
  endDate?: string
  // Universal metrics
  views?: number
  clicks?: number
  // Ad-specific
  spend?: number
  budget?: number
  conversions?: number
  conversionValue?: number
  cpm?: number
  adCtr?: number
  cpc?: number
  cpa?: number
  // Email-specific
  emailSends?: number
  deliveries?: number
  hardBounces?: number
  hardBounceRate?: number
  unsubscribes?: number
  emailOpenRate?: number
  emailCtr?: number
  uniqueClicks?: number
  // General
  duration?: string
  // Other
  partnerSpend?: number
  monetizationValue?: number
  targetViews?: number
  seen?: number
  budgetProgress?: number
  responses?: number
  participants?: number
  flight?: string
}

export interface Flight {
  id: string
  name: string
  status: CampaignStatus
  projectId: string
  campaignIds: string[]
  createdDate: string
  startDate?: string
  endDate?: string
}

export interface ProjectInfo {
  id: string
  name: string
}

export const sampleProjectInfos: ProjectInfo[] = [
  { id: 'spring-gala', name: 'Spring Gala' },
  { id: 'annual-fundraiser', name: 'Annual Fundraiser' },
  { id: 'q4-campaign', name: 'Q4 Campaign' },
  { id: 'awareness-month', name: 'Awareness Month' },
]

export const sampleCampaigns: Campaign[] = [
  // Spring Gala campaigns
  {
    id: 'c1',
    name: 'Gala Save the Date',
    type: 'email',
    status: 'completed',
    projectId: 'spring-gala',
    createdDate: '2026-02-10',
    startDate: '2026-02-15',
    endDate: '2026-02-15',
    views: 4200,
    clicks: 680,
    emailSends: 4500,
    deliveries: 4380,
    hardBounces: 120,
    hardBounceRate: 2.7,
    unsubscribes: 8,
    emailOpenRate: 32.1,
    emailCtr: 15.5,
    uniqueClicks: 640,
    duration: '1 day',
    flight: 'Spring Gala Launch Sequence',
  },
  {
    id: 'c2',
    name: 'Gala Ticket Sales',
    type: 'email',
    status: 'active',
    projectId: 'spring-gala',
    createdDate: '2026-03-01',
    startDate: '2026-03-15',
    views: 3800,
    clicks: 520,
    emailSends: 4000,
    deliveries: 3900,
    hardBounces: 100,
    hardBounceRate: 2.5,
    unsubscribes: 5,
    emailOpenRate: 28.5,
    emailCtr: 13.3,
    uniqueClicks: 490,
    duration: '15 days',
    flightId: 'f1',
    flight: 'Spring Gala Launch Sequence',
  },
  {
    id: 'c3',
    name: 'Gala Display Ads',
    type: 'ads',
    status: 'active',
    projectId: 'spring-gala',
    createdDate: '2026-03-05',
    startDate: '2026-03-10',
    views: 52000,
    clicks: 936,
    spend: 1250,
    budget: 2000,
    conversions: 42,
    conversionValue: 4200,
    cpm: 24.04,
    adCtr: 1.8,
    cpc: 1.34,
    cpa: 29.76,
    duration: '20 days',
    flightId: 'f1',
    flight: 'Spring Gala Launch Sequence',
  },
  {
    id: 'c4',
    name: 'Gala Meta Retargeting',
    type: 'meta',
    status: 'active',
    projectId: 'spring-gala',
    createdDate: '2026-03-08',
    startDate: '2026-03-12',
    views: 18500,
    clicks: 444,
    spend: 850,
    budget: 1500,
    conversions: 28,
    conversionValue: 2800,
    cpm: 45.95,
    adCtr: 2.4,
    cpc: 1.91,
    cpa: 30.36,
    duration: '18 days',
    flightId: 'f1',
    flight: 'Spring Gala Launch Sequence',
  },
  {
    id: 'c5',
    name: 'Gala Donation Form',
    type: 'monetization',
    status: 'active',
    projectId: 'spring-gala',
    createdDate: '2026-02-20',
    startDate: '2026-03-01',
    views: 1200,
    clicks: 184,
    conversions: 67,
    conversionValue: 8350,
    monetizationValue: 8350,
    duration: '29 days',
  },
  {
    id: 'c6',
    name: 'Gala Landing Page',
    type: 'landing-pages',
    status: 'active',
    projectId: 'spring-gala',
    createdDate: '2026-02-18',
    startDate: '2026-03-01',
    views: 8900,
    clicks: 2100,
    duration: '29 days',
  },
  {
    id: 'c7',
    name: 'Gala Volunteer Invites',
    type: 'invites',
    status: 'completed',
    projectId: 'spring-gala',
    createdDate: '2026-02-01',
    startDate: '2026-02-05',
    endDate: '2026-03-15',
    views: 350,
    clicks: 238,
    responses: 195,
    participants: 142,
    duration: '38 days',
  },

  // Annual Fundraiser campaigns
  {
    id: 'c8',
    name: 'Year-End Appeal',
    type: 'email',
    status: 'draft',
    projectId: 'annual-fundraiser',
    createdDate: '2026-03-25',
  },
  {
    id: 'c9',
    name: 'Matching Gift Ads',
    type: 'ads',
    status: 'scheduled',
    projectId: 'annual-fundraiser',
    createdDate: '2026-03-20',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    budget: 3000,
    flightId: 'f2',
    flight: 'Annual Fundraiser Drip',
  },
  {
    id: 'c10',
    name: 'Fundraiser Google Grants',
    type: 'google-ad-grants',
    status: 'scheduled',
    projectId: 'annual-fundraiser',
    createdDate: '2026-03-22',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    budget: 10000,
    flightId: 'f2',
    flight: 'Annual Fundraiser Drip',
  },
  {
    id: 'c11',
    name: 'Donor Thank You Email',
    type: 'email',
    status: 'draft',
    projectId: 'annual-fundraiser',
    createdDate: '2026-03-20',
    flightId: 'f2',
    flight: 'Annual Fundraiser Drip',
  },
  {
    id: 'c12',
    name: 'Fundraiser Donation Page',
    type: 'monetization',
    status: 'draft',
    projectId: 'annual-fundraiser',
    createdDate: '2026-03-22',
  },
  {
    id: 'c13',
    name: 'Fundraiser Track Links',
    type: 'track-links',
    status: 'active',
    projectId: 'annual-fundraiser',
    createdDate: '2026-03-10',
    startDate: '2026-03-15',
    views: 2100,
    clicks: 340,
    duration: '15 days',
  },

  // Q4 Campaign
  {
    id: 'c14',
    name: 'Holiday Newsletter',
    type: 'email',
    status: 'completed',
    projectId: 'q4-campaign',
    createdDate: '2025-11-20',
    startDate: '2025-12-01',
    endDate: '2025-12-01',
    views: 6500,
    clicks: 1200,
    emailSends: 7000,
    deliveries: 6800,
    hardBounces: 200,
    hardBounceRate: 2.9,
    unsubscribes: 15,
    emailOpenRate: 35.2,
    emailCtr: 17.6,
    uniqueClicks: 1100,
    duration: '1 day',
  },
  {
    id: 'c15',
    name: 'End of Year Ads',
    type: 'ads',
    status: 'completed',
    projectId: 'q4-campaign',
    createdDate: '2025-11-15',
    startDate: '2025-11-25',
    endDate: '2026-01-02',
    views: 125000,
    clicks: 1375,
    spend: 4800,
    budget: 5000,
    conversions: 89,
    conversionValue: 12460,
    cpm: 38.40,
    adCtr: 1.1,
    cpc: 3.49,
    cpa: 53.93,
    duration: '38 days',
  },
  {
    id: 'c16',
    name: 'Holiday Conversations',
    type: 'conversations',
    status: 'completed',
    projectId: 'q4-campaign',
    createdDate: '2025-11-28',
    startDate: '2025-12-01',
    endDate: '2025-12-31',
    views: 890,
    clicks: 420,
    responses: 312,
    duration: '30 days',
  },
  {
    id: 'c17',
    name: 'Giving Tuesday Meta',
    type: 'meta',
    status: 'completed',
    projectId: 'q4-campaign',
    createdDate: '2025-11-20',
    startDate: '2025-11-28',
    endDate: '2025-12-01',
    views: 45000,
    clicks: 1395,
    spend: 2200,
    budget: 2500,
    conversions: 156,
    conversionValue: 23400,
    cpm: 48.89,
    adCtr: 3.1,
    cpc: 1.58,
    cpa: 14.10,
    duration: '3 days',
  },

  // Awareness Month
  {
    id: 'c18',
    name: 'Awareness Email Series',
    type: 'email',
    status: 'active',
    projectId: 'awareness-month',
    createdDate: '2026-02-28',
    startDate: '2026-03-01',
    views: 5100,
    clicks: 890,
    emailSends: 5500,
    deliveries: 5350,
    hardBounces: 150,
    hardBounceRate: 2.7,
    unsubscribes: 12,
    emailOpenRate: 29.8,
    emailCtr: 16.2,
    uniqueClicks: 820,
    duration: '29 days',
    flightId: 'f3',
    flight: 'Awareness Month Push',
  },
  {
    id: 'c19',
    name: 'Awareness Display Campaign',
    type: 'ads',
    status: 'active',
    projectId: 'awareness-month',
    createdDate: '2026-02-25',
    startDate: '2026-03-01',
    views: 87000,
    clicks: 783,
    spend: 2100,
    budget: 3500,
    conversions: 34,
    conversionValue: 3400,
    cpm: 24.14,
    adCtr: 0.9,
    cpc: 2.68,
    cpa: 61.76,
    duration: '29 days',
    flightId: 'f3',
    flight: 'Awareness Month Push',
  },
  {
    id: 'c20',
    name: 'Mission Landing Page',
    type: 'landing-pages',
    status: 'active',
    projectId: 'awareness-month',
    createdDate: '2026-02-20',
    startDate: '2026-03-01',
    views: 3200,
    clicks: 1280,
    duration: '29 days',
  },
  {
    id: 'c21',
    name: 'Awareness Google Grants',
    type: 'google-ad-grants',
    status: 'active',
    projectId: 'awareness-month',
    createdDate: '2026-02-22',
    startDate: '2026-03-01',
    views: 32000,
    clicks: 896,
    spend: 0,
    budget: 10000,
    conversions: 45,
    conversionValue: 4500,
    cpm: 0,
    adCtr: 2.8,
    cpc: 0,
    cpa: 0,
    duration: '29 days',
  },
  {
    id: 'c22',
    name: 'Peer-to-Peer Invites',
    type: 'invites',
    status: 'active',
    projectId: 'awareness-month',
    createdDate: '2026-03-05',
    startDate: '2026-03-10',
    views: 220,
    clicks: 119,
    responses: 89,
    participants: 54,
    duration: '20 days',
  },
  {
    id: 'c23',
    name: 'Social Sharing Links',
    type: 'track-links',
    status: 'active',
    projectId: 'awareness-month',
    createdDate: '2026-03-01',
    startDate: '2026-03-01',
    views: 1400,
    clicks: 580,
    duration: '29 days',
  },
]

export const sampleFlights: Flight[] = [
  {
    id: 'f1',
    name: 'Spring Gala Launch Sequence',
    status: 'active',
    projectId: 'spring-gala',
    campaignIds: ['c2', 'c3', 'c4'],
    createdDate: '2026-03-01',
    startDate: '2026-03-10',
  },
  {
    id: 'f2',
    name: 'Annual Fundraiser Drip',
    status: 'scheduled',
    projectId: 'annual-fundraiser',
    campaignIds: ['c9', 'c10', 'c11'],
    createdDate: '2026-03-20',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
  },
  {
    id: 'f3',
    name: 'Awareness Month Push',
    status: 'active',
    projectId: 'awareness-month',
    campaignIds: ['c18', 'c19'],
    createdDate: '2026-02-25',
    startDate: '2026-03-01',
  },
]

// Helper to get campaigns for a flight
export function getCampaignsForFlight(flightId: string): Campaign[] {
  const flight = sampleFlights.find((f) => f.id === flightId)
  if (!flight) return []
  return sampleCampaigns.filter((c) => flight.campaignIds.includes(c.id))
}

// Helper to get standalone campaigns (not in any flight)
export function getStandaloneCampaigns(): Campaign[] {
  return sampleCampaigns.filter((c) => !c.flightId)
}

// Helper to get project name
export function getProjectName(projectId: string): string {
  return sampleProjectInfos.find((p) => p.id === projectId)?.name ?? projectId
}
