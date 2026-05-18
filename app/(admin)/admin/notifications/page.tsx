import { NotificationContainer } from '@/modules/notifications/components/notification-container'
import { NotificationListSkeleton } from '@/modules/notifications/components/notification-list-skeleton'
import { SectionContainer } from '@/shared/components/section-container'
import { SiteHeader } from '@/shared/components/site-header'
import { Suspense } from 'react'

export default function NotificationsPage() {
  return (
    <SectionContainer>
      <div className="w-full max-w-2xl mx-auto">
        <SiteHeader title="Notificaciones" />
        <Suspense fallback={<NotificationListSkeleton />}>
          <NotificationContainer />
        </Suspense>
      </div>
    </SectionContainer>
  )
}
