import { Activity, RecentActivity } from '../infrastructure/activity.mapper'

export interface ActivityService {
  getMany: () => Promise<Activity[]>
  getById: (activityId: string) => Promise<Activity>
  getRecents: () => Promise<RecentActivity[]>
  delete: (activityId: string) => Promise<Activity>
}

export interface RecentActivityProps {
  activity: RecentActivity
}

export interface RecentActivityListProps {
  activities: RecentActivity[]
}
