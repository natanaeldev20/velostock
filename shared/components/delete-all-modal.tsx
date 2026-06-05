'use client'

import { Button, Modal } from '@heroui/react'
import { TrashBin } from '@gravity-ui/icons'

export function DeleteAllButton({
  title,
  description,
  onConfirm
}: {
  title?: string
  description?: string
  onConfirm: () => void
}) {
  return (
    <Modal>
      <Button isIconOnly variant="danger-soft">
        <TrashBin />
      </Button>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{title}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div>
                <span>{description}</span>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="tertiary" slot="close">
                Cancelar
              </Button>
              <Button variant="danger" slot="close" onPress={onConfirm}>
                Mover a papelera
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
