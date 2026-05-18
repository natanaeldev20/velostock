export function SiteHeader({ title }: { title: string }) {
  return (
    <header className="w-full">
      <h1 className="text-xl font-bold">{title}</h1>
    </header>
  )
}
