'use client'

import {
  Button,
  Card,
  FieldError,
  Form,
  InputGroup,
  TextField,
  toast,
  Spinner
} from '@heroui/react'
import { PersonFill, Eye, EyeSlash, Key } from '@gravity-ui/icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { type Login, loginSchema } from '../schema/login.schema'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

export function LoginForm() {
  const [isVisible, setVisible] = useState(false)
  const router = useRouter()
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: Login) => {
    const res = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false
    })

    if (!res.ok || !res.error) {
      toast.success('Inicio de sesión exitoso', {
        timeout: 2000,
        description: 'Bienvenido al sistema'
      })
      router.push('/admin')
      return
    }

    toast.danger('Error de inicio de sesión', {
      timeout: 2000,
      description: 'Creadenciales inválidas'
    })
  }

  return (
    <Card className="w-full md:max-w-lg" variant="transparent">
      <Card.Header className="space-y-3">
        <Card.Title className="text-3xl font-bold text-center">
          Inicia sesión
        </Card.Title>
        <Card.Description>
          Digita tu nombre de usuario y contraseña para ingresar al sistema
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Form
          className="w-full flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <TextField
            type="text"
            name="username"
            isInvalid={!!form.formState.errors.username}
          >
            <InputGroup>
              <InputGroup.Prefix>
                <PersonFill className="size-4 text-muted" />
              </InputGroup.Prefix>
              <InputGroup.Input
                {...form.register('username')}
                placeholder="Nombre de usuario"
                className="py-4"
              />
            </InputGroup>
            <FieldError>{form.formState.errors.username?.message}</FieldError>
          </TextField>
          <TextField
            type="password"
            name="password"
            isInvalid={!!form.formState.errors.password}
          >
            <InputGroup>
              <InputGroup.Prefix>
                <Key className="size-4 text-muted" />
              </InputGroup.Prefix>
              <InputGroup.Input
                {...form.register('password', { required: true })}
                placeholder="Contraseña"
                className="py-4"
                type={isVisible ? 'text' : 'password'}
              />
              <InputGroup.Suffix>
                <Button
                  variant="ghost"
                  isIconOnly
                  size="sm"
                  onPress={() => setVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError>{form.formState.errors.password?.message}</FieldError>
          </TextField>
          <Button
            type="submit"
            className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 transition-colors font-semibold"
            aria-label="Iniciar sesión"
            aria-labelledby="Iniciar sesión"
            isPending={form.formState.isSubmitting}
          >
            {({ isPending }) => (
              <>
                {isPending ? (
                  <span className="flex flex-row items-center gap-2">
                    <Spinner color="current" size="sm" /> Ingresando...
                  </span>
                ) : (
                  'Ingresar'
                )}
              </>
            )}
          </Button>
        </Form>
      </Card.Content>
    </Card>
  )
}

// KitCode Solutions
