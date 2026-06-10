import { Container } from '@/shared/components/container'
import { Section } from '@/shared/components/section'
import { SiteHeader } from '@/shared/components/site-header'
import { Tabs } from '@heroui/react'
import { Persons, Folders, Box, ListCheck } from '@gravity-ui/icons'
import { DeletedUsersContainer } from '@/modules/users/components/deleted-users-container'

export default function TrashPage() {
  return (
    <Section>
      <SiteHeader
        title="Papelera"
        description="Administra los registros eliminados temporalmente. Puedes restaurarlos o eliminarlos de forma permanente."
      />
      <Container>
        <Tabs>
          <Tabs.ListContainer>
            <Tabs.List aria-label="Options">
              <Tabs.Tab id="usuarios">
                <div className="flex flex-row items-center gap-2">
                  <Persons />
                  <span className="hidden sm:block">Usuarios</span>
                </div>{' '}
                <Tabs.Indicator className="bg-indigo-600" />
              </Tabs.Tab>
              <Tabs.Tab id="categorias">
                <div className="flex flex-row items-center gap-2">
                  <Folders />
                  <span className="hidden sm:block">Categorías</span>
                </div>
                <Tabs.Indicator className="bg-indigo-600" />
              </Tabs.Tab>
              <Tabs.Tab id="productos">
                <div className="flex flex-row items-center gap-2">
                  <Box />
                  <span className="hidden sm:block">Productos</span>
                </div>
                <Tabs.Indicator className="bg-indigo-600" />
              </Tabs.Tab>
              <Tabs.Tab id="actividades">
                <div className="flex flex-row items-center gap-2">
                  <ListCheck />
                  <span className="hidden sm:block">Actividades</span>
                </div>
                <Tabs.Indicator className="bg-indigo-600" />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
          <Tabs.Panel id="usuarios">
            <DeletedUsersContainer />
          </Tabs.Panel>
          <Tabs.Panel id="categorias">
            <p>Esta es la seccion de categorias</p>
          </Tabs.Panel>
          <Tabs.Panel id="productos">
            <p>Esta es la seccion de productos</p>
          </Tabs.Panel>
          <Tabs.Panel id="actividades">
            <p>Esta es la seccion de actividades</p>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Section>
  )
}
