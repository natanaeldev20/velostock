import { getUserNav } from '@/modules/users/actions'
import { UserDropdown } from '../../../shared/components/navegation/user-dropdown'
import { UserNav } from '@/modules/users/infrastructure/user.mapper'

export async function NavUser() {
  const { data, ok } = await getUserNav()

  if (!data || !ok) return null

  const user: UserNav = {
    name: data.name,
    lastName: data.lastName,
    username: data.username,
    imgUrl: data.imgUrl
  }

  return <UserDropdown user={user} />
}
