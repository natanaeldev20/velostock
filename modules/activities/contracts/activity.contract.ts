import { Activity, RecentActivity } from '../infrastructure/activity.mapper'

export interface ActivityService {
  getMany: () => Promise<Activity[]>
  getById: (activityId: string) => Promise<Activity>
  getRecent: () => Promise<RecentActivity[]>
  delete: (activityId: string) => Promise<Activity>
}

export interface RecentActivityProps {
  activity: RecentActivity
}

export interface RecentActivityList {
  activities: RecentActivity[]
}
