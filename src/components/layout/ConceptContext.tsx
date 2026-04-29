import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react'

export type Concept = 'current' | 'task-based' | 'progressive' | 'simplified-hybrid'
export type UserMaturity = 'new' | 'mature'

const CONCEPT_STORAGE_KEY = 'feathr-concept-prototype'
const MATURITY_STORAGE_KEY = 'feathr-concept-maturity'

interface ConceptContextValue {
  activeConcept: Concept
  userMaturity: UserMaturity
  setActiveConcept: (concept: Concept) => void
  setUserMaturity: (maturity: UserMaturity) => void
}

const ConceptContext = createContext<ConceptContextValue | undefined>(undefined)

interface ConceptProviderProps {
  children: ReactNode
}

export function ConceptProvider({ children }: ConceptProviderProps) {
  const [activeConcept, setActiveConceptState] = useState<Concept>(() => {
    const stored = localStorage.getItem(CONCEPT_STORAGE_KEY)
    if (stored && ['current', 'task-based', 'progressive', 'simplified-hybrid'].includes(stored)) {
      return stored as Concept
    }
    return 'current'
  })

  const [userMaturity, setUserMaturityState] = useState<UserMaturity>(() => {
    const stored = localStorage.getItem(MATURITY_STORAGE_KEY)
    if (stored && ['new', 'mature'].includes(stored)) {
      return stored as UserMaturity
    }
    return 'new'
  })

  useEffect(() => {
    localStorage.setItem(CONCEPT_STORAGE_KEY, activeConcept)
  }, [activeConcept])

  useEffect(() => {
    localStorage.setItem(MATURITY_STORAGE_KEY, userMaturity)
  }, [userMaturity])

  const setActiveConcept = useCallback((concept: Concept) => {
    setActiveConceptState(concept)
  }, [])

  const setUserMaturity = useCallback((maturity: UserMaturity) => {
    setUserMaturityState(maturity)
  }, [])

  return (
    <ConceptContext.Provider
      value={{
        activeConcept,
        userMaturity,
        setActiveConcept,
        setUserMaturity,
      }}
    >
      {children}
    </ConceptContext.Provider>
  )
}

export function useConcept() {
  const context = useContext(ConceptContext)
  if (!context) {
    throw new Error('useConcept must be used within a ConceptProvider')
  }
  return context
}
