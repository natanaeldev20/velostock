import { Avatar, TableCell, TableRow } from '@heroui/react'
import { formatDate, formatHour12 } from '@/shared/utils/date-utils'
import { formatPeruCurrency } from '@/shared/utils/number-utils'
import { MovementRowProps } from '../contracts/inventory-movement.contract'

export function MovementRow({ movement }: MovementRowProps) {
  const DEFAULT_AVATAR =
    'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg'
  const AVATAR = movement.user.imgUrl ?? DEFAULT_AVATAR

  return (
    <TableRow>
      <TableCell>{formatHour12(movement.date)}</TableCell>
      <TableCell>{formatDate(movement.date)}</TableCell>
      <TableCell
        className={`${movement.type === 'ENTRADA' ? 'text-green-600' : 'text-red-600'} font-semibold`}
      >
        {movement.type}
      </TableCell>
      <TableCell>{movement.product.name}</TableCell>
      <TableCell>{movement.quantity}</TableCell>
      <TableCell>{formatPeruCurrency(Number(movement.priceAtMove))}</TableCell>
      <TableCell className="w-50">
        <div className="flex flex-row items-center gap-3">
          <Avatar size="sm">
            <Avatar.Image src={AVATAR} alt={movement.user.name} />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold">{movement.user.name}</span>
            <span>{movement.user.username}</span>
          </div>
        </div>
      </TableCell>
    </TableRow>
  )
}
