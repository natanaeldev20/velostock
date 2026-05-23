import { Avatar, Badge, Card } from '@heroui/react'
import type { RecentActivityProps } from '../contracts/activity.contract'

export function RecentActivityCard({ activity }: RecentActivityProps) {
  return (
    <Card
      variant="secondary"
      className="flex flex-row items-start gap-4 p-4 rounded-xl border-slate-100 shadow-sm transition-all duration-200"
    >
      <Badge.Anchor>
        <Avatar>
          <Avatar.Image
            src="https://img.magnific.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
          />
        </Avatar>
        <Badge color="success" placement="bottom-right" size="sm" />
      </Badge.Anchor>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium truncate">
            <span>{activity.user.name}</span>
            <span className="text-xs font-normal text-slate-400 mx-1">
              {activity.user.username}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 ml-1"></span>
          </p>
        </div>

        <p className="mt-1 text-sm line-clamp-2">{activity.description}</p>
      </div>
    </Card>
  )
}
