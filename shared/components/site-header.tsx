export function SiteHeader({
  title,
  description
}: {
  title: string
  description?: string
}) {
  return (
    <header className="w-full p-4 flex flex-col bg-indigo-600/20">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm">{description}</p>
    </header>
  )
}
