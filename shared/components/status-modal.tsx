import { Button, Card, Label, Modal, Switch } from '@heroui/react'
import { Power } from '@gravity-ui/icons'

export function StatusModal({
  title,
  isActive,
  onChange
}: {
  title: string
  userId: string
  isActive: boolean
  onChange: () => void
}) {
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
                <h2 className="text-lg font-bold">{title}</h2>
              </div>
            </Modal.Header>
            <Modal.Body>
              <Card variant="secondary" className="py-4">
                <Switch isSelected={isActive} onChange={onChange}>
                  <Switch.Control>
                    <Switch.Thumb>
                      <Switch.Icon />
                    </Switch.Thumb>
                  </Switch.Control>
                  <Switch.Content>
                    <Label className="text-sm">
                      {isActive ? 'Desactivar' : 'Activar'}
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
