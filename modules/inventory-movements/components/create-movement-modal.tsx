'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect, Key } from 'react'
import {
  Modal,
  TextField,
  Label,
  Input,
  Select,
  ListBox,
  Button,
  ErrorMessage,
  useOverlayState,
  toast,
  Card,
  Chip
} from '@heroui/react'
import { Product } from '@/modules/products/infrastructure/product.mapper'
import {
  type CreateInventoryMovement,
  createInventoryMovementSchema
} from '../schemas/movement.schema'
import { getProduct, getProducts } from '@/modules/products/actions'
import { CirclePlusFill } from '@gravity-ui/icons'
import { SpinnerLoader } from '@/shared/components/spinner-loader'
import { createInventoryMovement } from '../actions'
import { Type } from '@prisma/client'
import { useRouter } from 'next/navigation'

export function CreateMovementModal() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const router = useRouter()

  const state = useOverlayState({ defaultOpen: false })
  const {
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateInventoryMovement>({
    resolver: zodResolver(createInventoryMovementSchema)
  })

  const productId = watch('productId')

  async function onSubmit(data: CreateInventoryMovement) {
    const res = await createInventoryMovement(data)
    if (!res.ok) {
      toast.danger(res.message)
      return
    }
    toast.success(res.message)
    state.close()
    reset()
    router.refresh()
  }

  useEffect(() => {
    getProducts().then(({ data }) => setProducts(data ?? []))
    getProduct(productId).then(({ data }) => setSelectedProduct(data))
  }, [state.isOpen, productId])

  return (
    <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <Button className="bg-indigo-600 transition-all hover:bg-indigo-500">
        <CirclePlusFill />
        Nuevo movimiento
      </Button>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center">
          <Modal.Dialog>
            <Modal.CloseTrigger
              onPress={() => {
                state.close()
                reset()
              }}
            />
            <Modal.Header>
              <Modal.Heading>Nuevo movimiento</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <form
                className="flex flex-col gap-4 px-2 pb-2"
                id="create-movement-form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="type"
                  control={control}
                  render={({ field: { onChange } }) => {
                    function handleSelectionChange(key: Key | null) {
                      if (key) {
                        onChange(key as Type)
                      }
                    }

                    return (
                      <Select
                        variant="secondary"
                        onChange={handleSelectionChange}
                        placeholder="Selecciona un tipo"
                      >
                        <Label>Tipo de movimiento</Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="ENTRADA">Entrada</ListBox.Item>
                            <ListBox.Item id="SALIDA">Salida</ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    )
                  }}
                />
                <Controller
                  name="productId"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <div className="flex flex-col gap-2">
                      <Label>Producto</Label>
                      <Modal>
                        <Button
                          variant="tertiary"
                          className={`w-full flex justify-start ${selectedProduct ? 'text-white' : ''}`}
                        >
                          {selectedProduct?.name ?? 'Selecionar producto'}
                        </Button>
                        <Modal.Backdrop>
                          <Modal.Container placement="center">
                            <Modal.Dialog>
                              <Modal.CloseTrigger />
                              <Modal.Header>
                                <Modal.Heading>Elige un producto</Modal.Heading>
                              </Modal.Header>
                              <Modal.Body>
                                <div className="w-full p-2 grid grid-cols-2 gap-2">
                                  {products.map((p) => (
                                    <Card
                                      onClick={() => onChange(p.id)}
                                      className={`relative ${p.id === value ? 'ring-2 ring-white' : ''}`}
                                      variant="secondary"
                                      key={p.id}
                                    >
                                      <Chip
                                        className="absolute top-2 right-2"
                                        variant="primary"
                                        color={
                                          p.stock <= 5 ? 'danger' : 'success'
                                        }
                                      >
                                        {p.stock <= 5 ? 'Bajo' : 'OK'}
                                      </Chip>
                                      <Card.Content className="pt-4">
                                        <Card.Title>{p.name}</Card.Title>
                                        <Chip
                                          color={
                                            p.stock <= 5 ? 'danger' : 'success'
                                          }
                                          variant="tertiary"
                                        >
                                          <Chip.Label>
                                            Stock: {p.stock}
                                          </Chip.Label>
                                        </Chip>
                                      </Card.Content>
                                    </Card>
                                  ))}
                                </div>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button slot="close" variant="tertiary">
                                  Salir
                                </Button>
                              </Modal.Footer>
                            </Modal.Dialog>
                          </Modal.Container>
                        </Modal.Backdrop>
                      </Modal>
                    </div>
                  )}
                />
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field: { onChange, ...restField } }) => (
                    <TextField isInvalid={!!errors.quantity}>
                      <Label>Cantidad</Label>
                      <Input
                        onChange={(e) => onChange(Number(e.target.value))}
                        variant="secondary"
                        type="number"
                        placeholder="Ingresa una cantidad"
                        {...restField}
                      />
                      {errors.quantity?.message && (
                        <ErrorMessage>{errors.quantity.message}</ErrorMessage>
                      )}
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
                form="create-movement-form"
                className="bg-indigo-600 transition-all hover:bg-indigo-500"
                isPending={isSubmitting}
              >
                {({ isPending }) => (
                  <>
                    {isPending ? <SpinnerLoader text="Guardando" /> : 'Guardar'}
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
