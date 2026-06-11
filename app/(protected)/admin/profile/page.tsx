import { getUserProfile } from '@/modules/users/actions'
import { Container } from '@/shared/components/container'
import { EmptyState } from '@/shared/components/empty-state'
import { Section } from '@/shared/components/section'
import { DEFAULT_AVATAR } from '@/shared/constants/avatar'
import { Boxes3, ListCheck } from '@gravity-ui/icons'
import { Button, Card, Tabs } from '@heroui/react'
import Link from 'next/link'

export default async function ProfilePage() {
  const res = await getUserProfile()

  const AVATAR = res.data?.imgUrl ?? DEFAULT_AVATAR

  return (
    <Section>
      <Container>
        <Card
          variant="default"
          className="w-full space-y-4 lg:w-4xl lg:mx-auto"
        >
          <div className="grid grid-cols-1 gap-4 items-center lg:grid-cols-3">
            <div className="w-full flex justify-center lg:justify-end">
              <img
                className="w-40 aspect-square object-cover rounded-full shadow-xl sm:w-48 md:w-56"
                src={AVATAR}
                alt={res.data?.name}
              />
            </div>
            <div className="flex flex-col items-center lg:items-start lg:justify-start">
              <span className="text-3xl font-bold sm:text-4xl">
                {res.data?.name} {res.data?.lastName}
              </span>
              <span className="sm:text-lg">{res.data?.username}</span>
            </div>
            <div className="flex flex-row justify-center lg:justify-end">
              <Link href="/admin/profile/edit">
                <Button className="w-[250px] bg-indigo-600 text-lg transition-all hover:bg-indigo-500 lg:w-max">
                  Editar perfil
                </Button>
              </Link>
            </div>
          </div>
          <Tabs className="w-full">
            <Tabs.ListContainer>
              <Tabs.List aria-label="Options">
                <Tabs.Tab id="movimientos">
                  <div className="flex flex-row items-center gap-2">
                    <Boxes3 />
                    Movimientos
                  </div>
                  <Tabs.Indicator className="bg-indigo-600" />
                </Tabs.Tab>
                <Tabs.Tab id="actividades">
                  <div className="flex flex-row items-center gap-2">
                    <ListCheck />
                    Actividades
                  </div>
                  <Tabs.Indicator className="bg-indigo-600" />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
            <Tabs.Panel className="pt-4" id="movimientos">
              {res.data?.inventoryMovements.length === 0 ? (
                <EmptyState
                  title="0 movimientos"
                  description="Cuando existan movimientos se mostraran aqui"
                />
              ) : (
                <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                  {res.data?.inventoryMovements.map((movement) => (
                    <Card variant="secondary" key={movement.id}>
                      <Card.Header>
                        <Card.Title
                          className={
                            movement.type === 'ENTRADA'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }
                        >
                          {movement.type}
                        </Card.Title>
                        <Card.Description>
                          {movement.product.name}
                        </Card.Description>
                      </Card.Header>
                      <Card.Content>
                        <Card.Description className="text-lg font-semibold">
                          {movement.quantity}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  ))}
                </div>
              )}
            </Tabs.Panel>
            <Tabs.Panel className="pt-4" id="actividades">
              {res.data?.activities.length === 0 ? (
                <EmptyState
                  title="0 actividades"
                  description="Cuando existan actividades se mostraran aqui"
                />
              ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {res.data?.activities.map((activity) => (
                    <Card variant="secondary" key={activity.id}>
                      <Card.Content>
                        <p
                          className={`${activity.actionType === 'CREAR' ? 'text-green-600' : activity.actionType === 'ACTUALIZAR' ? 'text-yellow-400' : activity.actionType === 'ACTIVAR' ? 'text-orange-500' : activity.actionType === 'DESACTIVAR' ? 'text-purple-600' : 'text-red-600'} font-semibold`}
                        >
                          {activity.actionType}
                        </p>
                        <p className="font-bold">{activity.entity}</p>
                        <p className="text-sm">{activity.description}</p>
                      </Card.Content>
                    </Card>
                  ))}
                </div>
              )}
            </Tabs.Panel>
          </Tabs>
        </Card>
      </Container>
    </Section>
  )
}
