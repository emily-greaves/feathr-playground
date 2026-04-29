import { ReactNode } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FeatureFlagsProvider } from '@/contexts/FeatureFlagsContext'
import {
  AppSidebarNew,
  ExperienceBar,
  OptInBanner,
  PrototypeControlPanel,
} from '@/components/opt-in'

function OptInLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebarNew />
      <SidebarInset>
        <ExperienceBar featureId="newNavigation" />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function OptInDemoContent() {
  return (
    <div className="flex flex-col gap-4">
      <OptInBanner featureId="newNavigation" />
      <Card>
        <CardHeader>
          <CardTitle>Feature opt-in patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            This prototype demos discoverable, reversible "try the new experience" patterns: an
            experience bar, opt-in banner, sidebar opt-in, labs settings sheet, and a feedback
            dialog.
          </p>
          <p>
            Use the floating prototype control panel in the bottom-right to toggle individual
            feature flags and preview each pattern.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function FeatureOptIn() {
  return (
    <FeatureFlagsProvider>
      <OptInLayout>
        <OptInDemoContent />
      </OptInLayout>
      <PrototypeControlPanel />
    </FeatureFlagsProvider>
  )
}
