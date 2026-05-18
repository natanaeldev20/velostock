'use client'

import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  InputGroup,
  Spinner,
  TextField,
  toast
} from '@heroui/react'
import { useForm } from 'react-hook-form'
import { CreateUser, createUserSchema } from '../schemas/user.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserRoot } from '../actions'
import { Eye, EyeSlash, Key } from '@gravity-ui/icons'
import { useState } from 'react'

export function CreateUserForm() {
  const form = useForm<CreateUser>({ resolver: zodResolver(createUserSchema) })
  const [isVisible, setVisible] = useState(false)

  const onSubmit = async (data: CreateUser) => {
    const res = await createUserRoot(data)

    if (!res.ok) {
      toast.danger('Error al crear el usuario', {
        timeout: 2000,
        description: res.message
      })
      return
    }

    toast.success('Tareas exitosa', {
      timeout: 2000,
      description: res.message
    })
    form.reset()
  }

  return (
    <Card variant="default" className="md:max-w-xl">
      <Card.Header>
        <Card.Title>Crear nuevo usuario</Card.Title>
        <Card.Description>
          Completa el formulario para crear un nuevo usuario
        </Card.Description>
        <Card.Content>
          <Form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <TextField
              variant="secondary"
              type="text"
              name="imgUrl"
              isInvalid={!!form.formState.errors.imgUrl}
            >
              <Input
                placeholder="Foto de perfil"
                {...form.register('imgUrl')}
              />
              <FieldError>{form.formState.errors.imgUrl?.message}</FieldError>
            </TextField>
            <TextField
              variant="secondary"
              type="text"
              name="name"
              isInvalid={!!form.formState.errors.name}
            >
              <Input placeholder="Nombres" {...form.register('name')} />
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </TextField>
            <TextField
              type="text"
              name="lastName"
              variant="secondary"
              isInvalid={!!form.formState.errors.lastName}
            >
              <Input placeholder="Apellidos" {...form.register('lastName')} />
              <FieldError>{form.formState.errors.lastName?.message}</FieldError>
            </TextField>
            <TextField
              type="text"
              name="username"
              variant="secondary"
              isInvalid={!!form.formState.errors.username}
            >
              <Input
                placeholder="Nombre de usuario"
                {...form.register('username')}
              />
              <FieldError>{form.formState.errors.username?.message}</FieldError>
            </TextField>
            <TextField
              isInvalid={!!form.formState.errors.password}
              type="password"
              name="password"
              variant="secondary"
            >
              <InputGroup>
                <InputGroup.Prefix>
                  <Key className="size-4 text-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Contraseña"
                  {...form.register('password')}
                  type={isVisible ? 'text' : 'password'}
                />
                <InputGroup.Suffix>
                  <Button
                    variant="ghost"
                    isIconOnly
                    size="sm"
                    onPress={() => setVisible(!isVisible)}
                  >
                    {isVisible ? <Eye /> : <EyeSlash />}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError>{form.formState.errors.password?.message}</FieldError>
            </TextField>
            <Button
              type="submit"
              aria-label="Crear nuevo usuario"
              className="w-full bg-indigo-600 hover:bg-indigo-500 transition-colors"
              isPending={form.formState.isSubmitting}
            >
              {({ isPending }) => (
                <>
                  {isPending ? (
                    <span className="flex flex-row items-center gap-2">
                      <Spinner color="current" size="sm" /> Creando nuevo
                      usuario...
                    </span>
                  ) : (
                    'Crear nuevo usuario'
                  )}
                </>
              )}
            </Button>
          </Form>
        </Card.Content>
      </Card.Header>
    </Card>
  )
}
