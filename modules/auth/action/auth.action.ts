'use server'

import { handleAction } from '@/shared/infrastructure/handlers/handle-action'
import { authService } from '../services/auth.service'

export const getUserId = async () => handleAction(() => authService.getId())
