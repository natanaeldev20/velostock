import { Eye } from '@gravity-ui/icons'
import { Button, Chip, Modal } from '@heroui/react'

export function DetailsModal({
  title,
  isActive,
  children
}: {
  title: string
  isActive: boolean
  children: React.ReactNode
}) {
  return (
    <Modal>
      <Button variant="tertiary" isIconOnly>
        <Eye />
      </Button>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{title}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="relative">
                <Chip
                  className="absolute top-0 right-0"
                  color={isActive ? 'success' : 'danger'}
                  size="lg"
                  variant="soft"
                >
                  <Chip.Label>{isActive ? 'Activo' : 'Inactivo'}</Chip.Label>
                </Chip>
                <div className="flex flex-col">{children}</div>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
