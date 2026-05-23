import { NotificationListSkeleton } from '@/modules/notifications/components/notification-list-skeleton'
import { Section } from '@/shared/components/section'
import { SiteHeader } from '@/shared/components/site-header'
import { Separator } from '@heroui/react'
import { Suspense } from 'react'
import { Tabs } from '@heroui/react'
import { NotificationContainer } from '@/modules/notifications/components/notification-container'
import { UnreadNotificationContainer } from '@/modules/notifications/components/unread-notification-container'

export default function NotificationsPage() {
  return (
    <Section>
      <div className="w-full shadow-2xs bg-black/5 dark:bg-white/4 rounded-lg p-4 max-w-2xl mx-auto">
        <SiteHeader title="Notificaciones" />
        <Separator className="my-4" />
        <Tabs className="w-full">
          <Tabs.ListContainer>
            <Tabs.List>
              <Tabs.Tab id="all">
                Todas <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="unread">
                No leídas
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
          <Tabs.Panel id="all">
            <Suspense fallback={<NotificationListSkeleton />}>
              <NotificationContainer />
            </Suspense>
          </Tabs.Panel>
          <Tabs.Panel id="unread">
            <Suspense fallback={<NotificationListSkeleton />}>
              <UnreadNotificationContainer />
            </Suspense>
          </Tabs.Panel>
        </Tabs>
      </div>
    </Section>
  )
}
