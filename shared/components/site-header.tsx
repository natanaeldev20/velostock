export function SiteHeader({
  title,
  description
}: {
  title: string
  description?: string
}) {
  return (
    <header className="w-full p-4 flex flex-col">
      <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </header>
  )
}
