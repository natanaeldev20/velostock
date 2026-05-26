import { Button } from '@heroui/react'
import { ArrowUpArrowDown, CirclePlus } from '@gravity-ui/icons'

export function SiteHeader({ title }: { title: string }) {
  return (
    <header className="w-full p-4 flex flex-col items-center gap-4 sm:justify-between sm:flex-row ">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex flex-row items-center gap-3">
        <Button className="bg-indigo-600 py-7 px-4 rounded-lg flex flex-row gap-5">
          <ArrowUpArrowDown />
          <div className="flex flex-col font-semibold">
            <span>Nuevo</span>
            <span>Movimiento</span>
          </div>
        </Button>
        <Button className="bg-indigo-600 py-7 px-4 rounded-lg flex flex-row gap-5">
          <CirclePlus />
          <div className="flex flex-col font-semibold">
            <span>Nuevo</span>
            <span>Producto</span>
          </div>
        </Button>
      </div>
    </header>
  )
}
