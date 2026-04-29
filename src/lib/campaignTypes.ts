import {
  Mail,
  Monitor,
  Share2,
  Search,
  DollarSign,
  MessageCircle,
  FileText,
  Link,
  UserPlus,
  Plane,
  LucideIcon,
} from 'lucide-react'

export type CampaignType =
  | 'email'
  | 'ads'
  | 'meta'
  | 'google-ad-grants'
  | 'monetization'
  | 'conversations'
  | 'landing-pages'
  | 'track-links'
  | 'invites'

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'scheduled'

export interface CampaignTypeConfig {
  id: CampaignType
  label: string
  icon: LucideIcon
  color: string // Tailwind color prefix (e.g., 'blue', 'purple')
  bgClass: string
  textClass: string
  borderClass: string
}

export const campaignTypeConfigs: Record<CampaignType, CampaignTypeConfig> = {
  email: {
    id: 'email',
    label: 'Email',
    icon: Mail,
    color: 'blue',
    bgClass: 'bg-blue-100 dark:bg-blue-950',
    textClass: 'text-blue-700 dark:text-blue-300',
    borderClass: 'border-blue-200 dark:border-blue-800',
  },
  ads: {
    id: 'ads',
    label: 'Ads',
    icon: Monitor,
    color: 'purple',
    bgClass: 'bg-purple-100 dark:bg-purple-950',
    textClass: 'text-purple-700 dark:text-purple-300',
    borderClass: 'border-purple-200 dark:border-purple-800',
  },
  meta: {
    id: 'meta',
    label: 'Meta',
    icon: Share2,
    color: 'indigo',
    bgClass: 'bg-indigo-100 dark:bg-indigo-950',
    textClass: 'text-indigo-700 dark:text-indigo-300',
    borderClass: 'border-indigo-200 dark:border-indigo-800',
  },
  'google-ad-grants': {
    id: 'google-ad-grants',
    label: 'Google Ad Grants',
    icon: Search,
    color: 'amber',
    bgClass: 'bg-amber-100 dark:bg-amber-950',
    textClass: 'text-amber-700 dark:text-amber-300',
    borderClass: 'border-amber-200 dark:border-amber-800',
  },
  monetization: {
    id: 'monetization',
    label: 'Monetization',
    icon: DollarSign,
    color: 'green',
    bgClass: 'bg-green-100 dark:bg-green-950',
    textClass: 'text-green-700 dark:text-green-300',
    borderClass: 'border-green-200 dark:border-green-800',
  },
  conversations: {
    id: 'conversations',
    label: 'Conversations',
    icon: MessageCircle,
    color: 'teal',
    bgClass: 'bg-teal-100 dark:bg-teal-950',
    textClass: 'text-teal-700 dark:text-teal-300',
    borderClass: 'border-teal-200 dark:border-teal-800',
  },
  'landing-pages': {
    id: 'landing-pages',
    label: 'Landing Pages',
    icon: FileText,
    color: 'slate',
    bgClass: 'bg-slate-100 dark:bg-slate-800',
    textClass: 'text-slate-700 dark:text-slate-300',
    borderClass: 'border-slate-200 dark:border-slate-700',
  },
  'track-links': {
    id: 'track-links',
    label: 'Track Links',
    icon: Link,
    color: 'orange',
    bgClass: 'bg-orange-100 dark:bg-orange-950',
    textClass: 'text-orange-700 dark:text-orange-300',
    borderClass: 'border-orange-200 dark:border-orange-800',
  },
  invites: {
    id: 'invites',
    label: 'Invites',
    icon: UserPlus,
    color: 'pink',
    bgClass: 'bg-pink-100 dark:bg-pink-950',
    textClass: 'text-pink-700 dark:text-pink-300',
    borderClass: 'border-pink-200 dark:border-pink-800',
  },
}

export const flightConfig = {
  label: 'Flight',
  icon: Plane,
  bgClass: 'bg-gray-100 dark:bg-gray-800',
  textClass: 'text-gray-700 dark:text-gray-300',
  borderClass: 'border-gray-300 dark:border-gray-600 border-dashed',
}

export const statusConfig: Record<CampaignStatus, { label: string; bgClass: string; textClass: string }> = {
  draft: {
    label: 'Draft',
    bgClass: 'bg-gray-100 dark:bg-gray-800',
    textClass: 'text-gray-600 dark:text-gray-400',
  },
  active: {
    label: 'Active',
    bgClass: 'bg-emerald-100 dark:bg-emerald-950',
    textClass: 'text-emerald-700 dark:text-emerald-300',
  },
  paused: {
    label: 'Paused',
    bgClass: 'bg-yellow-100 dark:bg-yellow-950',
    textClass: 'text-yellow-700 dark:text-yellow-300',
  },
  completed: {
    label: 'Completed',
    bgClass: 'bg-blue-100 dark:bg-blue-950',
    textClass: 'text-blue-700 dark:text-blue-300',
  },
  scheduled: {
    label: 'Scheduled',
    bgClass: 'bg-violet-100 dark:bg-violet-950',
    textClass: 'text-violet-700 dark:text-violet-300',
  },
}

export const allCampaignTypes = Object.values(campaignTypeConfigs)
