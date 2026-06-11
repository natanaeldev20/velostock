'use client'

import { useForm, Controller } from 'react-hook-form'
import {
  Form,
  TextField,
  Label,
  Input,
  Button,
  ErrorMessage,
  Card,
  toast,
  Separator,
  Modal,
  Avatar
} from '@heroui/react'

import { UserProps } from '../contracts/user.contract'
import { UpdateUser, updateUserSchema } from '../schemas/user.schema'
import { updateUser } from '../actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerLoader } from '@/shared/components/spinner-loader'
import { AVATARS_LIST, DEFAULT_AVATAR } from '@/shared/constants/avatar'
import { Camera } from '@gravity-ui/icons'

export function EditProfileForm({ user }: UserProps) {
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<UpdateUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
      username: user.username,
      imgUrl: user.imgUrl
    }
  })

  async function onSubmit(data: UpdateUser) {
    const res = await updateUser(user.id, data)
    if (!res.ok) {
      toast.danger(res.message)
      return
    }
    toast.success(res.message)
  }

  const AVATAR = watch('imgUrl')

  return (
    <Card className="w-full md:w-lg md:mx-auto">
      <div>
        <h2 className="text-lg font-semibold">Editar perfil</h2>
      </div>
      <Separator />
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-row items-center justify-center">
          <Controller
            name="imgUrl"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Modal>
                <div className="relative">
                  <Button className="absolute bg-indigo-600 rounded-full w-14 h-14 bottom-0 right-0">
                    <Camera className="size-10" />
                  </Button>
                  <img
                    className="w-50 aspect-square object-cover rounded-full"
                    src={AVATAR ?? DEFAULT_AVATAR}
                    alt={user.name}
                  />
                </div>

                <Modal.Backdrop variant="blur">
                  <Modal.Container>
                    <Modal.Dialog>
                      <Modal.CloseTrigger />
                      <Modal.Header>
                        <Modal.Heading className="font-semibold text-lg">
                          Elegir avatar de perfil
                        </Modal.Heading>
                        <Separator />
                      </Modal.Header>
                      <Modal.Body>
                        <div className="p-2 flex flex-row gap-2 flex-wrap">
                          {AVATARS_LIST.map((avatar) => (
                            <Avatar
                              onClick={() => onChange(avatar)}
                              className={`${value === avatar ? 'ring-3 ring-white' : ''} hover:cursor-pointer`}
                              key={avatar}
                              size="lg"
                            >
                              <Avatar.Image src={avatar} alt="avatar" />
                            </Avatar>
                          ))}
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="tertiary" slot="close">
                          Cerrar
                        </Button>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </Modal.Container>
                </Modal.Backdrop>
              </Modal>
            )}
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
                placeholder="Ingresa un nombre"
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
            <TextField isInvalid={!!errors.username}>
              <Label>Nombre de usuario</Label>
              <Input
                variant="secondary"
                placeholder="Ingresa un nombre de usuario"
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
            <TextField isInvalid={!!errors.password}>
              <Label>Cambiar contraseña</Label>
              <Input
                variant="secondary"
                placeholder="Ingresa tu nueva contraseña"
                {...field}
              />
              {errors.password?.message && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </TextField>
          )}
        />
        <Button
          className="w-full bg-indigo-600 transition-all hover:bg-indigo-500"
          type="submit"
          isPending={isSubmitting}
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
      </Form>
    </Card>
  )
}
