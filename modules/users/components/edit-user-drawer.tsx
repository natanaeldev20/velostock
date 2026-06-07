import { Pencil } from '@gravity-ui/icons'
import {
  Avatar,
  Drawer,
  ErrorMessage,
  Input,
  Label,
  Modal,
  TextField,
  toast
} from '@heroui/react'
import { Button } from '@heroui/react'
import { useForm, Controller } from 'react-hook-form'
import { UserProps } from '../contracts/user.contract'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateUser, updateUserSchema } from '../schemas/user.schema'
import { updateUser } from '../actions'
import { DEFAULT_AVATAR } from '@/shared/constants/avatar'
import { AVATARS_LIST } from '@/shared/constants/avatar'
import { SpinnerLoader } from '@/shared/components/spinner-loader'

export function EditUserDrawer({ user }: UserProps) {
  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
      username: user.username,
      imgUrl: user.imgUrl
    }
  })

  const currentImgUrl = watch('imgUrl')

  const onSubmit = async (data: UpdateUser) => {
    const res = await updateUser(user.id, data)
    if (!res.ok) {
      toast.danger('Error al actualizar usuario')
      return
    }
    toast.success(res.message)
  }

  return (
    <Drawer>
      <Button isIconOnly variant="tertiary">
        <Pencil />
      </Button>
      <Drawer.Backdrop variant="blur">
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.CloseTrigger onPress={() => reset()} />
            <Drawer.Header>
              <Drawer.Heading>Editar usuario</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <form
                id="edit-user-form"
                className="space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="w-full flex justify-center">
                  <img
                    className="w-[150px] aspect-square object-cover rounded-full"
                    src={currentImgUrl || DEFAULT_AVATAR}
                    alt={user.name}
                  />
                </div>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField isInvalid={!!errors.name}>
                      <Label>Nombre</Label>
                      <Input
                        variant="secondary"
                        placeholder="Ingresa tu nombre"
                        {...field}
                      />
                      {errors.name?.message && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                      )}
                    </TextField>
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField isInvalid={!!errors.lastName}>
                      <Label>Apellido</Label>
                      <Input
                        variant="secondary"
                        placeholder="Ingresa tu apellido"
                        {...field}
                      />
                      {errors.lastName?.message && (
                        <ErrorMessage>{errors.lastName.message}</ErrorMessage>
                      )}
                    </TextField>
                  )}
                />
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField isInvalid={!!errors.username}>
                      <Label>Nombre de usuario</Label>
                      <Input
                        variant="secondary"
                        placeholder="Ingresa tu nombre de usuario"
                        {...field}
                      />
                      {errors.username?.message && (
                        <ErrorMessage>{errors.username.message}</ErrorMessage>
                      )}
                    </TextField>
                  )}
                />
                <Controller
                  name="imgUrl"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <Modal>
                        <Button className="w-full rounded-lg bg-indigo-600 transition-all hover:bg-indigo-500">
                          Seleccionar avatar
                        </Button>
                        <Modal.Backdrop variant="blur">
                          <Modal.Container placement="center">
                            <Modal.Dialog>
                              <Modal.CloseTrigger />
                              <Modal.Header>
                                <Modal.Heading>
                                  Selecciona un avatar
                                </Modal.Heading>
                              </Modal.Header>
                              <Modal.Body>
                                <div className="w-full flex flex-row flex-wrap gap-3 p-2">
                                  {AVATARS_LIST.map((item: string) => {
                                    const isSelected = item === value
                                    return (
                                      <Avatar
                                        onClick={() => onChange(item)}
                                        key={item}
                                        size="lg"
                                        className={
                                          isSelected
                                            ? 'ring-4 ring-white'
                                            : 'block'
                                        }
                                      >
                                        <Avatar.Image src={item} />
                                      </Avatar>
                                    )
                                  })}
                                </div>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  slot="close"
                                  className="bg-indigo-600 transition-all hover:bg-indigo-500"
                                >
                                  Cerrar
                                </Button>
                              </Modal.Footer>
                            </Modal.Dialog>
                          </Modal.Container>
                        </Modal.Backdrop>
                      </Modal>
                    </div>
                  )}
                />
              </form>
            </Drawer.Body>
            <Drawer.Footer>
              <Button slot="close" variant="tertiary" onPress={() => reset()}>
                Cancelar
              </Button>
              <Button
                form="edit-user-form"
                type="submit"
                isPending={isSubmitting}
                className="bg-indigo-600 transition-all hover:bg-indigo-500"
              >
                {({ isPending }) => (
                  <>
                    {isPending ? (
                      <SpinnerLoader text="Guardando cambios" />
                    ) : (
                      'Guardar cambios'
                    )}
                  </>
                )}
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}
