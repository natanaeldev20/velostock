import React from 'react'

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="p-4 flex flex-col gap-4">{children}</div>
}
