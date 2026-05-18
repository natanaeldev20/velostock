import { Activity } from '../infrastructure/activity.mapper'

export interface ActivityService {
  getMany: () => Promise<Activity[]>
  getById: (activityId: string) => Promise<Activity>
  delete: (activityId: string) => Promise<Activity>
}
