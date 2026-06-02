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
import { UserRowProps } from '../contracts/user.contract'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateUser, updateUserSchema, User } from '../schemas/user.schema'
import { updateUser } from '../actions'

const AVATARS = [
  'https://img.magnific.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?semt=ais_hybrid&w=740&q=80',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ioJPME7aE8yggQRZVy4Uw4_bubdX5KItHw&s',
  'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671136.jpg?semt=ais_hybrid&w=740&q=80',
  'https://img.magnific.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671140.jpg?semt=ais_hybrid&w=740&q=80',
  'https://img.freepik.com/psd-gratis/renderizacion-3d-estilo-cabello-diseno-avatar_23-2151869129.jpg?semt=ais_hybrid&w=740&q=80',
  'https://img.freepik.com/psd-gratis/renderizacion-3d-estilo-cabello-diseno-avatar_23-2151869165.jpg?w=360',
  'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-linea_23-2151303065.jpg',
  'https://img.freepik.com/psd-gratis/renderizacion-3d-estilo-cabello-diseno-avatar_23-2151869133.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAe5DoLW8HdRkJ3jJEqT6_YuKgbM5S07m2fA&s',
  'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671161.jpg',
  'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671134.jpg?w=360',
  'https://img.freepik.com/psd-gratis/render-3d-personaje-avatar_23-2150611746.jpg?semt=ais_hybrid&w=740&q=80'
]

const DEFAULT_AVATAR =
  'https://img.freepik.com/vector-premium/icono-perfil-avatar-predeterminado-imagen-usuario-redes-sociales-icono-avatar-gris-silueta-perfil-blanco-ilustracion-vectorial_561158-3383.jpg'

export function EditUserButton({ user }: UserRowProps) {
  const {
    register,
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
            <Drawer.CloseTrigger />
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
                <TextField>
                  <Label>Nombre</Label>
                  <Input
                    variant="secondary"
                    placeholder="Ingresa tu nombre"
                    {...register('name')}
                  />
                  {errors && (
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>
                  )}
                </TextField>
                <TextField>
                  <Label>Apellido</Label>
                  <Input
                    variant="secondary"
                    placeholder="Ingresa tu apellido"
                    {...register('lastName')}
                  />
                  {errors && (
                    <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
                  )}
                </TextField>
                <TextField>
                  <Label>Nombre de usuario</Label>
                  <Input
                    variant="secondary"
                    placeholder="Ingresa tu nombre de usuario"
                    {...register('username')}
                  />
                  {errors && (
                    <ErrorMessage>{errors.username?.message}</ErrorMessage>
                  )}
                </TextField>
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
                          <Modal.Container>
                            <Modal.Dialog>
                              <Modal.CloseTrigger />
                              <Modal.Header>
                                <Modal.Heading>
                                  Selecciona un avatar
                                </Modal.Heading>
                              </Modal.Header>
                              <Modal.Body>
                                <div className="w-full flex flex-row flex-wrap gap-3 p-2">
                                  {AVATARS.map((item: string) => {
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
              <Button slot="close" variant="tertiary">
                Cancelar
              </Button>
              <Button
                form="edit-user-form"
                type="submit"
                isDisabled={isSubmitting}
                className="bg-indigo-600 transition-all hover:bg-indigo-500"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}
