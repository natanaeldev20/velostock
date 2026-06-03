import { Eye } from '@gravity-ui/icons'
import { Button, Chip, Modal } from '@heroui/react'
import { UserRowProps } from '../contracts/user.contract'
import { DEFAULT_AVATAR } from '@/shared/constants/avatar'

export function UserDetailsButton({ user }: UserRowProps) {
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
              <Modal.Heading>Detalles de usuario</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="relative">
                <Chip
                  className="absolute top-0 right-0"
                  color={user.isActive ? 'success' : 'danger'}
                  size="lg"
                  variant="soft"
                >
                  <Chip.Label>
                    {user.isActive ? 'Activo' : 'Inactivo'}
                  </Chip.Label>
                </Chip>
                <div className="flex justify-center py-2">
                  <img
                    className="w-[110px] ring-3 ring-white rounded-full aspect-square object-cover"
                    src={user.imgUrl || DEFAULT_AVATAR}
                  />
                </div>
                <div className="text-center flex flex-col">
                  <span className="text-lg font-semibold text-white">
                    {user.name} {user.lastName}
                  </span>
                  <span>{user.username}</span>
                </div>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
