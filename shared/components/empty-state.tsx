export function EmptyState({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <div className="w-full text-center h-50 flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  )
}
