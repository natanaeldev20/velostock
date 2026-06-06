'use client'

import {
  ErrorMessage,
  Input,
  Label,
  Modal,
  TextField,
  Select,
  ListBox,
  Button,
  TextArea,
  toast,
  Spinner,
  useOverlayState
} from '@heroui/react'
import { Controller, useForm } from 'react-hook-form'
import { CreateProduct } from '../schemas/product.schema'
import { CirclePlusFill } from '@gravity-ui/icons'
import type { CategoriesProps } from '@/modules/categories/contracts/category.contract'
import { Key } from 'react'
import { createProduct } from '../actions'

export function CreateProductModal({ categories }: CategoriesProps) {
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control
  } = useForm<CreateProduct>({
    defaultValues: {
      categoryId: '',
      name: '',
      description: ''
    }
  })
  const current = watch('price')
  const state = useOverlayState({ defaultOpen: false })

  const onSubmit = async (data: CreateProduct) => {
    const res = await createProduct(data)
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
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Nuevo producto</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <form
                id="create-product-form"
                onSubmit={handleSubmit(onSubmit)}
                className="w-full px-2 pb-2 flex flex-col gap-4"
              >
                <p>{current}</p>
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
                  name="categoryId"
                  control={control}
                  render={({ field: { onChange } }) => {
                    const handleSelectionChange = (key: Key | null) => {
                      if (key) {
                        onChange(key as string)
                      }
                    }
                    return (
                      <Select
                        placeholder="Seleccionar categoría"
                        variant="secondary"
                        onChange={handleSelectionChange}
                      >
                        <Label>Categoría</Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {categories.map((c) => (
                              <ListBox.Item key={c.id} id={c.id}>
                                {c.name}
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    )
                  }}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { value, ...restField } }) => (
                    <div className="flex flex-col gap-1">
                      <Label>Descripción</Label>
                      <TextArea
                        placeholder="Ingresa una descripción"
                        variant="secondary"
                        rows={3}
                        {...restField}
                      />
                      {errors.description?.message && (
                        <ErrorMessage>
                          {errors.description.message}
                        </ErrorMessage>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  render={({ field: { onChange, ...restField } }) => (
                    <TextField>
                      <Label>Precio</Label>
                      <Input
                        variant="secondary"
                        type="number"
                        onChange={(e) => onChange(Number(e.target.value))}
                        {...restField}
                      />
                    </TextField>
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
                type="submit"
                form="create-product-form"
                className="bg-indigo-600 transition-all hover:bg-indigo-500"
                isPending={isSubmitting}
              >
                {({ isPending }) => (
                  <>
                    {isPending ? (
                      <span className="flex flex-row items-center gap-1">
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
