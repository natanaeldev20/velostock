import { NotificationListSkeleton } from '@/modules/notifications/components/notification-list-skeleton'
import { SectionContainer } from '@/shared/components/section-container'
import { SiteHeader } from '@/shared/components/site-header'
import { Separator } from '@heroui/react'
import { Suspense } from 'react'
import { Tabs } from '@heroui/react'
import { NotificationContainer } from '@/modules/notifications/components/notification-container'
import { UnreadNotificationContainer } from '@/modules/notifications/components/unread-notification-container'

export default function NotificationsPage() {
  return (
    <SectionContainer>
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
            <NotificationContainer />
          </Tabs.Panel>
          <Tabs.Panel id="unread">
            <UnreadNotificationContainer />
          </Tabs.Panel>
        </Tabs>
      </div>
    </SectionContainer>
  )
}
