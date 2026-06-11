import { Container } from '@/shared/components/container'
import { Section } from '@/shared/components/section'
import { SiteHeader } from '@/shared/components/site-header'
import { Tabs } from '@heroui/react'
import { Persons, Folders, Box } from '@gravity-ui/icons'
import { DeletedUsersContainer } from '@/modules/users/components/deleted-users-container'
import { DeletedCategoryContainer } from '@/modules/categories/components/deleted-category-container'
import { DeletedProductContainer } from '@/modules/products/components/deleted-product-container'

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
            </Tabs.List>
          </Tabs.ListContainer>
          <Tabs.Panel id="usuarios">
            <DeletedUsersContainer />
          </Tabs.Panel>
          <Tabs.Panel id="categorias">
            <DeletedCategoryContainer />
          </Tabs.Panel>
          <Tabs.Panel id="productos">
            <DeletedProductContainer />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Section>
  )
}
