'use client'

import { Table } from '@heroui/react'
import { ActivitiesProps } from '../contracts/activity.contract'
import { ActivityRow } from './activity-row'

export function ActivityTable({ activities }: ActivitiesProps) {
  return (
    <Table className="h-[400px]">
      <Table.ScrollContainer>
        <Table.Content>
          <Table.Header>
            <Table.Column isRowHeader>Hora</Table.Column>
            <Table.Column>Fecha</Table.Column>
            <Table.Column>Tipo de acción</Table.Column>
            <Table.Column>Entidad</Table.Column>
            <Table.Column>Descripción</Table.Column>
            <Table.Column>Usuario</Table.Column>
            <Table.Column>Acciones</Table.Column>
          </Table.Header>
          <Table.Body>
            {activities.map((item) => (
              <ActivityRow key={item.id} activity={item} />
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
}
