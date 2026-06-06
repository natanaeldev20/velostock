'use client'

import { useState } from 'react'
import {
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
import { Controller, useForm } from 'react-hook-form'
import {
  CreateCategory,
  createCategorySchema
} from '../schemas/category.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCategory } from '../actions'
import { CirclePlusFill } from '@gravity-ui/icons'

export function CreateCategoryModal() {
  const state = useOverlayState({ defaultOpen: false })
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm<CreateCategory>({
    defaultValues: { name: '' },
    resolver: zodResolver(createCategorySchema)
  })

  const onSubmit = async (data: CreateCategory) => {
    const res = await createCategory(data)
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
      <Button className="bg-indigo-600 transition-all hover:bg-indigo-500">
        <CirclePlusFill />
        Nueva categoría
      </Button>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Nueva categoría</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <form
                id="create-category-form"
                onSubmit={handleSubmit(onSubmit)}
                className="p-2"
              >
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
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onPress={() => state.close()} variant="tertiary">
                Cancelar
              </Button>
              <Button
                type="submit"
                form="create-category-form"
                className="bg-indigo-600 transition-all hover:bg-indigo-500"
                isPending={isSubmitting}
              >
                {({ isPending }) => (
                  <>
                    {isPending ? (
                      <span className="flex flex-row items-center gap-2">
                        <Spinner size="sm" />
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
