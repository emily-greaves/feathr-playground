import { ReactNode } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { ConceptSidebar } from './ConceptSidebar'
import { SecondarySidebar } from './SecondarySidebar'
import { NavigationProvider, useNavigation } from './NavigationContext'
import { ConceptProvider } from './ConceptContext'
import { ConceptSwitcher } from './ConceptSwitcher'

interface ConceptLayoutProps {
  children: ReactNode
}

function ConceptLayoutContent({ children }: ConceptLayoutProps) {
  const { sidebarOpen, setSidebarOpen } = useNavigation()

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <ConceptSidebar />
      <SecondarySidebar />
      <SidebarInset>
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </SidebarInset>
      <ConceptSwitcher />
    </SidebarProvider>
  )
}

export function ConceptLayout({ children }: ConceptLayoutProps) {
  return (
    <ConceptProvider>
      <NavigationProvider>
        <ConceptLayoutContent>{children}</ConceptLayoutContent>
      </NavigationProvider>
    </ConceptProvider>
  )
}
