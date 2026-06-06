import { Avatar, Button, Drawer } from '@heroui/react'
import { TrashBin } from '@gravity-ui/icons'

export function DeleteDrawer({
  onConfirm,
  title,
  description,
  imgUrl,
  fallback
}: {
  onConfirm: () => void
  title: string
  description: string
  imgUrl?: string
  fallback?: string
}) {
  return (
    <Drawer>
      <Button isIconOnly variant="danger-soft">
        <TrashBin />
      </Button>
      <Drawer.Backdrop variant="blur">
        <Drawer.Content placement="bottom">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>{title}</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <div>
                <p>{description}</p>
                {imgUrl && (
                  <div className="w-full p-4 flex justify-center">
                    <Avatar size="lg">
                      <Avatar.Image src={imgUrl} />
                      <Avatar.Fallback>{fallback}</Avatar.Fallback>
                    </Avatar>
                  </div>
                )}
              </div>
            </Drawer.Body>
            <Drawer.Footer>
              <Button slot="close" variant="tertiary">
                Cancelar
              </Button>
              <Button slot="close" variant="danger" onPress={onConfirm}>
                Mover a papelera
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}
