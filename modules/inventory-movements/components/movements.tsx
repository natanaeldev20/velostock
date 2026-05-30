import { Button, Card } from '@heroui/react'
import { MovementContainer } from './movement-container'

export function Movements() {
  return (
    <Card>
      <Card.Header className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold">Movimientos recientes</h2>
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
