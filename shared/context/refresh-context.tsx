'use client'

import { useContext, createContext, useState } from 'react'

const RefreshContext = createContext<
  | {
      refreshTrigger: boolean
      triggerRefresh: () => void
    }
  | undefined
>(undefined)

export function RefreshProvider({ children }: { children: React.ReactNode }) {
  const [refreshTrigger, setRefreshTrigger] = useState(false)

  const triggerRefresh = () => setRefreshTrigger((prev) => !prev)

  return (
    <RefreshContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  )
}

export function useRefresh() {
  const context = useContext(RefreshContext)

  if (!context) {
    throw new Error(
      'refreshTrigger debe ser actualizado dentro de RefreshProvider'
    )
  }

  return context
}
