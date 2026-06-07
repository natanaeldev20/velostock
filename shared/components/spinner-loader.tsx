import { Spinner } from '@heroui/react'

export function SpinnerLoader({ text }: { text: string }) {
  return (
    <span className="flex flex-row items-center gap-2">
      <Spinner size="sm" />
      {text}
    </span>
  )
}
