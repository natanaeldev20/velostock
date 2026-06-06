'use client'

import { CirclePlusFill } from '@gravity-ui/icons'
import {
  Avatar,
  Button,
  ErrorMessage,
  Input,
  Label,
  Modal,
  Spinner,
  TextField,
  toast,
  useOverlayState
} from '@heroui/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateUser, createUserSchema } from '../schemas/user.schema'
import { createUser } from '../actions'
import { AVATARS_LIST, DEFAULT_AVATAR } from '@/shared/constants/avatar'

export function CreateUserModal() {
  const state = useOverlayState({ defaultOpen: false })
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      lastName: '',
      username: '',
      password: ''
    }
  })

  const currentImgUrl = watch('imgUrl')

  const onSubmit = async (data: CreateUser) => {
    const res = await createUser(data)

    if (!res.ok) {
      toast.danger(res.message)
      return
    }
    toast.success(res.message)
    state.close()
    reset()
  }

  return (
    <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <Button className="bg-indigo-600">
        <CirclePlusFill />
        Nuevo usuario
      </Button>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center">
          <Modal.Dialog>
            <Modal.CloseTrigger onPress={() => reset()} />
            <Modal.Header>
              <Modal.Heading>Nuevo usuario</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <form
                className="px-1 space-y-4"
                id="create-user-form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="w-full flex justify-center py-1">
                  <img
                    className="w-[150px] aspect-square object-cover rounded-full ring-3 ring-white"
                    src={currentImgUrl || DEFAULT_AVATAR}
                    alt="Usuario nuevo"
                  />
                </div>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField type="text" isInvalid={!!errors.name}>
                      <Label>Nombre</Label>
                      <Input
                        variant="secondary"
                        placeholder="Ingrese un nombre"
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
                    <TextField type="text" isInvalid={!!errors.lastName}>
                      <Label>Apellido</Label>
                      <Input
                        variant="secondary"
                        placeholder="Ingresa un apellido"
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
                    <TextField type="text" isInvalid={!!errors.username}>
                      <Label>Nombre de usuario</Label>
                      <Input
                        variant="secondary"
                        placeholder="Ingrese un nombre de usuario"
                        {...field}
                      />
                      {errors.username?.message && (
                        <ErrorMessage>{errors.username.message}</ErrorMessage>
                      )}
                    </TextField>
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField type="password" isInvalid={!!errors.username}>
                      <Label>Contraseña</Label>
                      <Input
                        variant="secondary"
                        placeholder="Ingrese una contraseña"
                        {...field}
                      />
                      {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
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
                              <Modal.CloseTrigger onPress={() => reset()} />
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
            </Modal.Body>
            <Modal.Footer>
              <Button
                onPress={() => {
                  state.close()
                  reset()
                }}
                variant="tertiary"
              >
                Cancelar
              </Button>
              <Button
                className="bg-indigo-600 transition-all hover:bg-indigo-500"
                type="submit"
                form="create-user-form"
                isPending={isSubmitting}
              >
                {({ isPending }) => (
                  <>
                    {isPending ? (
                      <span className="flex flex-row items-center gap-2">
                        <Spinner />
                        Guardando
                      </span>
                    ) : (
                      'Guardar'
                    )}
                  </>
                )}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
