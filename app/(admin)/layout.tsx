import { Navbar } from '@/shared/components/navegation'

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="w-full">{children}</main>
    </>
  )
}
