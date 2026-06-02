import { Button, Card, Label, Modal, Switch, toast } from '@heroui/react'
import { Power, SealCheck } from '@gravity-ui/icons'
import { toggleUserStatus } from '../actions'

export function UserStatusButton({
  userId,
  isActive
}: {
  userId: string
  isActive: boolean
}) {
  const handleStatus = async () => {
    const res = await toggleUserStatus(userId, isActive)
    if (!res.ok) {
      toast.danger('Error al cambiar de estado')
      return
    }
    toast.success(
      `Usuario ${res.data?.isActive ? 'activado' : 'desactivado'} con exitó`,
      { indicator: <SealCheck /> }
    )
  }

  return (
    <Modal>
      <Button
        className="text-black dark:text-white"
        variant="secondary"
        isIconOnly
      >
        <Power />
      </Button>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <div>
                <h2 className="text-lg font-bold">
                  Cambiar el estado del usuario
                </h2>
              </div>
            </Modal.Header>
            <Modal.Body>
              <Card variant="secondary" className="py-4">
                <Switch isSelected={isActive} onChange={handleStatus}>
                  <Switch.Control>
                    <Switch.Thumb>
                      <Switch.Icon />
                    </Switch.Thumb>
                  </Switch.Control>
                  <Switch.Content>
                    <Label className="text-sm">
                      {isActive ? 'Desactivar usuario' : 'Activar usuario'}
                    </Label>
                  </Switch.Content>
                </Switch>
              </Card>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
