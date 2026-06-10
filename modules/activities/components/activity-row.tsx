import { Avatar, TableCell, TableRow } from '@heroui/react'
import { ActivityProps } from '../contracts/activity.contract'
import { formatDate, formatHour12 } from '@/shared/utils/date-utils'
import { DEFAULT_AVATAR } from '@/shared/constants/avatar'
import { DeleteActiviyDrawer } from './delete-activity-drawer'

export function ActivityRow({ activity }: ActivityProps) {
  const AVATAR = activity.user.imgUrl ?? DEFAULT_AVATAR
  const NAME = activity.user.name[0] + activity.user.lastName[0]
  return (
    <TableRow>
      <TableCell>{formatHour12(activity.createdAt)}</TableCell>
      <TableCell>{formatDate(activity.createdAt)}</TableCell>
      <TableCell
        className={`${activity.actionType === 'CREAR' ? 'text-green-600' : activity.actionType === 'ACTUALIZAR' ? 'text-yellow-400' : activity.actionType === 'ACTIVAR' ? 'text-orange-500' : activity.actionType === 'DESACTIVAR' ? 'text-purple-600' : 'text-red-600'} font-semibold`}
      >
        {activity.actionType}
      </TableCell>
      <TableCell>{activity.entity}</TableCell>
      <TableCell>{activity.description}</TableCell>
      <TableCell>
        <div className="flex flex-row items-center gap-3">
          <Avatar size="md">
            <Avatar.Image src={AVATAR} />
            <Avatar.Fallback>{NAME}</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">
              {activity.user.name} {activity.user.lastName}
            </span>
            <span>{activity.user.username}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <DeleteActiviyDrawer activityId={activity.id} />
      </TableCell>
    </TableRow>
  )
}
