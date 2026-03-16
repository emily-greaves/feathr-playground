import { Toaster } from '@/components/ui/sonner'
import { AppLayout } from '@/components/layout'
import { Agentation } from 'agentation'
import Home from '@/pages/Home'

function App() {
  return (
    <>
      <AppLayout>
        <Home />
      </AppLayout>
      <Toaster position="bottom-right" richColors />
      {import.meta.env.DEV && <Agentation />}
    </>
  )
}

export default App
