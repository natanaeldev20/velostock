import { ThemeSwitch } from '../theme/theme-switch'
import { ContactSupportButton } from './cotact-support-button'
import { NavUser } from '../../../modules/users/components/nav-user'
import { NotificationButton } from './notification-button'

export function NavSecondary() {
  return (
    <nav className="flex flex-row items-center gap-2">
      <ContactSupportButton />
      <ThemeSwitch />
      <NotificationButton />
      <NavUser />
    </nav>
  )
}
