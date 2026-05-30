import { Avatar, TableCell, TableRow } from '@heroui/react'
import { InventoryMovement } from '../infrastructure/inventory-movement.mapper'
import { formatDate } from '@/shared/utils/date-utils'
import { formatPeruCurrency } from '@/shared/utils/number-utils'

export function MovementRow({
  date,
  type,
  product,
  quantity,
  priceAtMove,
  user
}: InventoryMovement) {
  const AVATAR =
    user.imgUrl ??
    'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg'

  return (
    <TableRow>
      <TableCell>{formatDate(date)}</TableCell>
      <TableCell
        className={`${type === 'ENTRADA' ? 'text-green-600' : 'text-red-600'} font-semibold`}
      >
        {type}
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>{formatPeruCurrency(Number(priceAtMove))}</TableCell>
      <TableCell className="w-50">
        <div className="flex flex-row items-center gap-3">
          <Avatar size="sm">
            <Avatar.Image src={AVATAR} alt={user.name} />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold">{user.name}</span>
            <span>{user.username}</span>
          </div>
        </div>
      </TableCell>
    </TableRow>
  )
}
