'use client'

import { Pencil } from '@gravity-ui/icons'
import {
  Button,
  Drawer,
  TextField,
  Label,
  Input,
  ErrorMessage,
  Select,
  ListBox,
  TextArea,
  useOverlayState,
  toast
} from '@heroui/react'
import { useForm, Controller } from 'react-hook-form'
import { UpdateProduct, updateProductSchema } from '../schemas/product.schema'
import { ProductProps } from '../contracts/product.contract'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerLoader } from '@/shared/components/spinner-loader'
import { Key, useEffect, useState } from 'react'
import { Category } from '@/modules/categories/infrastructure/category.mapper'
import { getCategories } from '@/modules/categories/actions'
import { updateProduct } from '../actions'

export function EditProductDrawer({ product }: ProductProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const state = useOverlayState({ defaultOpen: false })
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<UpdateProduct>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: product.name,
      categoryId: product.category.id,
      description: product.description,
      price: product.price
    }
  })

  useEffect(() => {
    const getData = async () => {
      const { data } = await getCategories()
      setCategories(data ?? [])
    }

    getData()
  }, [state.isOpen])

  const onSubmit = async (data: UpdateProduct) => {
    const res = await updateProduct(product.id, data)
    if (!res.ok) {
      toast.danger(res.message)
      return
    }
    toast.success(res.message)
  }

  return (
    <Drawer isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <Button variant="tertiary" isIconOnly>
        <Pencil />
      </Button>
      <Drawer.Backdrop variant="blur">
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Editar producto</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <form id="edit-product-form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField isInvalid={!!errors.name}>
                      <Label>Nombre</Label>
                      <Input
                        placeholder="Ingresa un nombre"
                        variant="secondary"
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
                  render={({ field: { onChange, value } }) => {
                    const handleSelectionChange = (key: Key | null) =>
                      onChange(key as string)

                    return (
                      <div className="flex flex-col gap-2">
                        <Select
                          defaultValue={value}
                          variant="secondary"
                          isInvalid={!!errors.categoryId}
                          placeholder="Selecionar categoría"
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
                        {errors.categoryId?.message && (
                          <ErrorMessage>
                            {errors.categoryId.message}
                          </ErrorMessage>
                        )}
                      </div>
                    )
                  }}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { value, ...restField } }) => (
                    <div className="flex flex-col gap-2">
                      <Label>Descripción</Label>
                      <TextArea
                        variant="secondary"
                        value={value ?? ''}
                        {...restField}
                        placeholder="Ingresa una descripción"
                        rows={3}
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
                  render={({ field: { onChange, value, ...restField } }) => (
                    <TextField>
                      <Label>Precio</Label>
                      <Input
                        type="number"
                        value={value ?? ''}
                        variant="secondary"
                        placeholder="Ingresa un precio"
                        onChange={(e) => {
                          const val = e.target.value

                          onChange(val === '' ? '' : Number(val))
                        }}
                        {...restField}
                      />
                      {errors.price?.message && (
                        <ErrorMessage>{errors.price.message}</ErrorMessage>
                      )}
                    </TextField>
                  )}
                />
              </form>
            </Drawer.Body>
            <Drawer.Footer>
              <Button
                variant="tertiary"
                onPress={() => {
                  state.close()
                }}
              >
                Cancelar
              </Button>
              <Button
                form="edit-product-form"
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
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}
