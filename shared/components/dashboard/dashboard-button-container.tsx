export function DashboardButtonContainer({
  children,
  title
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-md font-bold md:text-lg">{title}</h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {children}
      </div>
    </div>
  )
}
