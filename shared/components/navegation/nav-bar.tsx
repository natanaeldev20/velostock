import { NavSecondary } from './nav-secondary'
import { NavMain } from './nav-main'

export function Navbar() {
  return (
    <header className="z-10 sticky top-0 bg-white dark:bg-[#121212] px-4 py-4 flex flex-row justify-between items-center">
      <NavMain />
      <NavSecondary />
    </header>
  )
}
