import { useForm, Controller } from 'react-hook-form'
import { CategoryProps } from '../contracts/category.contract'
import { UpdateCategory } from '../schemas/category.schema'
import {
  Button,
  Drawer,
  TextField,
  Label,
  Input,
  ErrorMessage,
  Spinner,
  toast
} from '@heroui/react'
import { Pencil } from '@gravity-ui/icons'
import { updateCategory } from '../actions'

export function EditCategoryDrawer({ category }: CategoryProps) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control
  } = useForm<UpdateCategory>({
    defaultValues: { name: category.name }
  })

  const onSubmit = async (data: UpdateCategory) => {
    const res = await updateCategory(category.id, data)
    if (!res.ok) {
      toast.danger(res.message)
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
              <Drawer.Heading>Editar categoría</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <form id="edit-category-form" onSubmit={handleSubmit(onSubmit)}>
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
            </Drawer.Body>
            <Drawer.Footer>
              <Button slot="close" variant="tertiary" onPress={() => reset()}>
                Cancelar
              </Button>
              <Button
                type="submit"
                form="edit-category-form"
                className="bg-indigo-600 transition-all hover:bg-indigo-500"
                isPending={isSubmitting}
              >
                {({ isPending }) => (
                  <>
                    {isPending ? (
                      <span className="flex flex-row gap-2">
                        <Spinner color="current" size="sm" />
                        Guardando cambios
                      </span>
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
