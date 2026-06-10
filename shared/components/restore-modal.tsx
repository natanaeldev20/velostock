import { Button, Modal } from '@heroui/react'
import { ArrowRotateRight } from '@gravity-ui/icons'

export function RestoreModal({
  title,
  description,
  imgUrl,
  name,
  onPress
}: {
  title: string
  description: string
  imgUrl: string
  name: string
  onPress: () => void
}) {
  return (
    <Modal>
      <Button variant="tertiary" isIconOnly>
        <ArrowRotateRight />
      </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{title}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-4">
                <p>{description}</p>
                <div className="grid place-content-center">
                  <img
                    className="w-30 aspect-square object-cover rounded-full"
                    src={imgUrl}
                    alt={name}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="tertiary">
                Cancelar
              </Button>
              <Button className="bg-indigo-600" onPress={onPress}>
                Restaurar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
