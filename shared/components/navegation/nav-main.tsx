import { Button, Drawer } from '@heroui/react'
import Link from 'next/link'
import {
  BarsUnaligned,
  Box,
  Persons,
  Boxes3,
  House,
  Folders,
  ListCheck
} from '@gravity-ui/icons'
import Image from 'next/image'
import { Icon, IconData } from '@gravity-ui/uikit'

const navItems: {
  icon: IconData
  label: string
  url: string
}[] = [
  { icon: House, label: 'Inicio', url: '/admin' },
  { icon: Persons, label: 'Usuarios', url: '/admin/users' },
  { icon: Folders, label: 'Categorías', url: '/admin/categories' },
  { icon: Box, label: 'Productos', url: '/admin/products' },
  { icon: Boxes3, label: 'Inventario', url: '/admin/inventory' },
  { icon: ListCheck, label: 'Actividades', url: '/admin/actividades' }
]

export function NavMain() {
  return (
    <Drawer>
      <div className="flex flex-row items-center text-xl font-medium gap-2">
        <Button isIconOnly variant="tertiary">
          <Icon data={BarsUnaligned} />
        </Button>
        <Link href="/admin" className="text-xl font-medium">
          Velostock
        </Link>
      </div>
      <Drawer.Backdrop variant="blur">
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <div className="flex flex-col items-center justify-center">
                <Image
                  alt="Velostock"
                  src="/logo-velostock.png"
                  width={1183}
                  height={700}
                  className="w-30 md:w-40"
                />
                <Drawer.Heading className="text-3xl font-extrabold :md:text-4xl">
                  Velostock
                </Drawer.Heading>
              </div>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link key={item.label} href={item.url}>
                    <Button
                      variant="ghost"
                      slot="close"
                      className="w-full flex justify-start items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    >
                      <Icon data={item.icon} size={18} />
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}
