'use client'

import { Button, Drawer } from '@heroui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarsUnaligned,
  Box,
  Persons,
  Boxes3,
  House,
  Folders,
  ListCheck
} from '@gravity-ui/icons'
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
  const pathname = usePathname()
  return (
    <Drawer>
      <div className="flex flex-row items-center text-xl font-medium gap-2">
        <Button isIconOnly variant="tertiary">
          <Icon data={BarsUnaligned} />
        </Button>
        <Link href="/admin" className="flex flex-row items-center gap-1">
          <div className="p-1.5 bg-indigo-600 rounded-lg shadow-xl shadow-blue-50/20">
            <Box className="size-6 text-white" />
          </div>
          <span className="text-2xl font-bold hidden sm:block">Velostock</span>
        </Link>
      </div>
      <Drawer.Backdrop variant="blur">
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header className="mb-4">
              <div className="flex">
                <Drawer.Heading className="flex flex-row gap-2 items-center md:text-4xl">
                  <div className="bg-indigo-600 p-2 rounded-lg shadow-xl shadow-blue-50/20">
                    <Box className="size-8 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold">Velostock</span>
                    <span className="text-sm font-semibold text-indigo-500">
                      Control de inventario
                    </span>
                  </div>
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
                      className={`w-full flex justify-start items-center gap-3 rounded-xl px-3 py-3 text-sm text-foreground transition-colors ${item.url === pathname ? 'bg-indigo-600 text-white' : ''}`}
                    >
                      <Icon data={item.icon} className="size-5" />
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
