import {
  Megaphone,
  Users2,
  Settings,
  Bell,
  BookOpen,
  HelpCircle,
  Plug,
  BarChart3,
  Plus,
  Home,
} from 'lucide-react'
import { NavItem } from './navigation'

// ============================================================================
// CONCEPT 0: Current Navigation (Baseline)
// Uses existing navigationItems from navigation.ts
// ============================================================================

// ============================================================================
// CONCEPT 1: Task-Based Flat Navigation
// Project becomes a filter, not a navigation container
// ============================================================================

export const taskBasedNavItems: NavItem[] = [
  {
    id: 'campaigns',
    title: 'Campaigns',
    icon: Megaphone,
    children: [
      { id: 'all', title: 'All', href: '#' },
      { id: 'email', title: 'Email', href: '#' },
      { id: 'ads', title: 'Ads', href: '#' },
      { id: 'social', title: 'Social', href: '#' },
      { id: 'monetization', title: 'Monetization', href: '#' },
    ],
  },
  {
    id: 'audience',
    title: 'Audience',
    icon: Users2,
    children: [
      { id: 'people', title: 'People', href: '#' },
      { id: 'segments', title: 'Segments', href: '#' },
      { id: 'groups', title: 'Groups', href: '#' },
      { id: 'imports', title: 'Imports', href: '#' },
      { id: 'super-pixel', title: 'Super Pixel', href: '#' },
    ],
  },
  {
    id: 'reports',
    title: 'Reports',
    icon: BarChart3,
    children: [
      { id: 'dashboard', title: 'Dashboard', href: '#' },
      { id: 'campaign-reports', title: 'Campaign Reports', href: '#' },
      { id: 'project-reports', title: 'Project Reports', href: '#' },
    ],
  },
]

export const taskBasedSettingsItem: NavItem = {
  id: 'settings',
  title: 'Settings',
  icon: Settings,
  children: [
    { id: 'general', title: 'General', href: '#' },
    { id: 'team', title: 'Team', href: '#' },
    { id: 'billing', title: 'Billing', href: '#' },
    { id: 'integrations', title: 'Integrations', href: '#' },
  ],
}

// ============================================================================
// CONCEPT 2: Progressive Disclosure
// New user: Create, My Campaigns, Account (3 items)
// Mature user: Create, Campaigns, Audience, Reports, Settings (5 items)
// ============================================================================

export const progressiveNewUserNavItems: NavItem[] = [
  {
    id: 'create',
    title: 'Create',
    icon: Plus,
    children: [], // Opens wizard
  },
  {
    id: 'my-campaigns',
    title: 'My Campaigns',
    icon: Megaphone,
    children: [], // Simple list view
  },
  {
    id: 'account',
    title: 'Account',
    icon: Settings,
    children: [
      { id: 'profile', title: 'Profile', href: '#' },
      { id: 'notifications', title: 'Notifications', href: '#' },
    ],
  },
]

export const progressiveMatureUserNavItems: NavItem[] = [
  {
    id: 'create',
    title: 'Create',
    icon: Plus,
    children: [], // Opens wizard
  },
  {
    id: 'campaigns',
    title: 'Campaigns',
    icon: Megaphone,
    children: [
      { id: 'all', title: 'All', href: '#' },
      { id: 'email', title: 'Email', href: '#' },
      { id: 'ads', title: 'Ads', href: '#' },
      { id: 'social', title: 'Social', href: '#' },
      { id: 'monetization', title: 'Monetization', href: '#' },
    ],
  },
  {
    id: 'audience',
    title: 'Audience',
    icon: Users2,
    children: [
      { id: 'people', title: 'People', href: '#' },
      { id: 'segments', title: 'Segments', href: '#' },
      { id: 'groups', title: 'Groups', href: '#' },
      { id: 'imports', title: 'Imports', href: '#' },
    ],
  },
  {
    id: 'reports',
    title: 'Reports',
    icon: BarChart3,
    children: [
      { id: 'overview', title: 'Overview', href: '#' },
      { id: 'performance', title: 'Performance', href: '#' },
    ],
  },
]

export const progressiveMatureSettingsItem: NavItem = {
  id: 'settings',
  title: 'Settings',
  icon: Settings,
  children: [
    { id: 'general', title: 'General', href: '#' },
    { id: 'team', title: 'Team', href: '#' },
    { id: 'billing', title: 'Billing', href: '#' },
    { id: 'integrations', title: 'Integrations', href: '#' },
  ],
}

// ============================================================================
// CONCEPT 3: Simplified Hybrid
// Home, Campaigns, People, Settings
// "Community" → "People", familiar structure preserved
// ============================================================================

export const simplifiedHybridNavItems: NavItem[] = [
  {
    id: 'home',
    title: 'Home',
    icon: Home,
    children: [], // Dashboard view
  },
  {
    id: 'campaigns',
    title: 'Campaigns',
    icon: Megaphone,
    children: [
      { id: 'all', title: 'All', href: '#' },
      { id: 'email', title: 'Email', href: '#' },
      { id: 'ads', title: 'Ads', href: '#' },
      { id: 'social', title: 'Social', href: '#' },
      { id: 'monetization', title: 'Monetization', href: '#' },
    ],
  },
  {
    id: 'people',
    title: 'People',
    icon: Users2,
    children: [
      { id: 'all-people', title: 'All People', href: '#' },
      { id: 'segments', title: 'Segments', href: '#' },
      { id: 'groups', title: 'Groups', href: '#' },
      { id: 'imports', title: 'Imports', href: '#' },
      { id: 'super-pixel', title: 'Super Pixel', href: '#' },
    ],
  },
]

export const simplifiedHybridSettingsItem: NavItem = {
  id: 'settings',
  title: 'Settings',
  icon: Settings,
  children: [
    { id: 'general', title: 'General', href: '#' },
    { id: 'team', title: 'Team', href: '#' },
    { id: 'billing', title: 'Billing', href: '#' },
    { id: 'integrations', title: 'Integrations', href: '#' },
  ],
}

// Helper items used across concepts
export const conceptNotificationsItem: NavItem = {
  id: 'notifications',
  title: 'Notifications',
  icon: Bell,
  children: [],
}

export const conceptResourcesItem: NavItem = {
  id: 'resources',
  title: 'Resources',
  icon: BookOpen,
  children: [],
}

export const conceptHelpItem: NavItem = {
  id: 'help',
  title: 'Help',
  icon: HelpCircle,
  children: [],
}

export const conceptIntegrationsItem: NavItem = {
  id: 'integrations',
  title: 'Integrations',
  icon: Plug,
  children: [
    {
      id: 'api',
      title: 'API',
      href: '#',
      children: [
        { id: 'api-keys', title: 'API keys', href: '#' },
      ],
    },
    {
      id: 'crm',
      title: 'CRM',
      href: '#',
      children: [
        { id: 'raisers-edge-nxt', title: "Raiser's Edge NXT", href: '#' },
        { id: 'salesforce-npsp', title: 'Salesforce NPSP', href: '#' },
      ],
    },
  ],
}
