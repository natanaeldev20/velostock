export function SiteHeader({
  title,
  description,
  children
}: {
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <header
      className="w-full p-4 flex gap-4 items-start
     flex-col sm:flex-row sm:justify-between sm:items-center"
    >
      <div className="flex flex-col">
        <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div>{children}</div>
    </header>
  )
}
