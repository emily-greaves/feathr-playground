import { useEffect, useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { PrototypeFrame } from '@/components/layout/PrototypeFrame'
import Playground from '@/pages/Playground'
import { getPrototype } from '@/prototypes'

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return hash.replace(/^#\/?/, '').trim()
}

function App() {
  const slug = useHashRoute()
  const prototype = slug ? getPrototype(slug) : undefined

  return (
    <>
      {prototype ? (
        <PrototypeFrame prototype={prototype}>
          {prototype.render()}
        </PrototypeFrame>
      ) : (
        <Playground />
      )}
      <Toaster position="bottom-right" richColors />
    </>
  )
}

export default App
