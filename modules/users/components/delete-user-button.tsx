import { Avatar, Button, Drawer, toast } from '@heroui/react'
import { TrashBin } from '@gravity-ui/icons'
import { softDeleteUser } from '../actions'

export function DeleteUserButton({
  userId,
  name,
  lastName,
  imgUrl,
  fallback
}: {
  userId: string
  name: string
  lastName: string
  imgUrl: string
  fallback: string
}) {
  const handleDelete = async () => {
    const res = await softDeleteUser(userId)
    if (!res.ok) {
      toast.danger('Error al eliminar usuario')
      return
    }
    toast.success(`Usuario/a ${name} ${lastName} eliminado/a con exitó.`)
  }

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
              <Drawer.Heading>Eliminar usuario</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <div>
                <p>
                  Estas seguro de mover a la papelera al usuario{' '}
                  <span className="font-medium">
                    {name} {lastName}
                  </span>
                  ?
                </p>
                <div className="w-full p-4 flex justify-center">
                  <Avatar size="lg">
                    <Avatar.Image src={imgUrl} />
                    <Avatar.Fallback>{fallback}</Avatar.Fallback>
                  </Avatar>
                </div>
              </div>
            </Drawer.Body>
            <Drawer.Footer>
              <Button slot="close" variant="tertiary">
                Cancelar
              </Button>
              <Button slot="close" variant="danger" onPress={handleDelete}>
                Eliminar
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}
