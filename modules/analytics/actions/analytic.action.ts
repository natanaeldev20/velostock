'use server'

import { handleAction } from '@/shared/infrastructure/handlers/handle-action'
import { analyticService } from '../services/analytic.service'

export const getSummaryStats = async () =>
  handleAction(() => analyticService.getMany())
