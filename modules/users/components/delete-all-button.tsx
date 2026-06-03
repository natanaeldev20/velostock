import { Button, Modal, toast } from '@heroui/react'
import { TrashBin } from '@gravity-ui/icons'
import { softDeleteManyUsers } from '../actions'

export function DeleteAllButton() {
  const handleDeleteAll = async () => {
    const res = await softDeleteManyUsers()
    if (!res.ok) {
      toast.danger(res.message)
      return
    }
    toast.success(res.message)
  }

  return (
    <Modal>
      <Button isIconOnly variant="danger-soft">
        <TrashBin />
      </Button>
      <Modal.Backdrop variant="blur">
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>
                Estas seguro de eliminar a estos usuarios?
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div>
                <span>Todos los usuarios se moveran a la papelera</span>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="tertiary" slot="close">
                Cancelar
              </Button>
              <Button variant="danger" slot="close" onPress={handleDeleteAll}>
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
