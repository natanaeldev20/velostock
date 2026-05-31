import { Button, Card } from '@heroui/react'
import { MovementContainer } from './movement-container'

export function Movements() {
  return (
    <Card className="border-2 border-gray-100 dark:border-white/7">
      <Card.Header className="flex flex-row gap-3 items-center justify-between">
        <h2 className="text-lg font-bold sm:text-xl">Movimientos recientes</h2>
        <Button className="bg-indigo-600 transition-all hover:bg-indigo-500">
          Ver todos
        </Button>
      </Card.Header>
      <Card.Content>
        <MovementContainer />
      </Card.Content>
    </Card>
  )
}
