// // app/actions.ts
// "use server";
// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";

// export async function updateSelection(id: string, isSelected: boolean) {
//   await prisma.user.update({
//     where: { id },
//     data: { isSelected }, // Aquí Prisma guarda true o false
//   });

//   revalidatePath("/usuarios"); // Refresca los datos en el cliente
// }

// export async function updateAllSelections(isSelected: boolean) {
//   await prisma.user.updateMany({
//     data: { isSelected },
//   });

//   revalidatePath("/usuarios");
// }

// "use client";
// import { Checkbox, CheckboxGroup } from "@heroui/react";
// import { updateSelection, updateAllSelections } from "./actions";

// export function UserTable({ users }) {
//   // Obtenemos los IDs que ya están marcados en la BD al cargar
//   const selectedIds = users.filter(u => u.isSelected).map(u => u.id);

//   // Función para el "Seleccionar Todos"
//   const handleHeaderChange = async (isSelected: boolean) => {
//     // Si el master check cambia, todos en la BD cambian a ese valor
//     await updateAllSelections(isSelected);
//   };

//   // Función para cambios individuales
//   const handleRowChange = async (id: string, isSelected: boolean) => {
//     // Esta es la clave: enviamos el ID y el nuevo estado (true/false)
//     await updateSelection(id, isSelected);
//   };

//   return (
//     <div>
//       {/* Checkbox Maestro */}
//       <Checkbox
//         isSelected={selectedIds.length === users.length}
//         isIndeterminate={selectedIds.length > 0 && selectedIds.length < users.length}
//         onValueChange={handleHeaderChange}
//       >
//         Seleccionar todos
//       </Checkbox>

//       {/* Lista de usuarios */}
//       <div className="flex flex-col gap-4 mt-4">
//         {users.map((user) => (
//           <Checkbox
//             key={user.id}
//             isSelected={user.isSelected} // Viene de la BD
//             onValueChange={(isSelected) => handleRowChange(user.id, isSelected)}
//           >
//             {user.name}
//           </Checkbox>
//         ))}
//       </div>
//     </div>
//   );
// }

// {
//   users.map((user) => (
//     <Checkbox
//       key={user.id}
//       // AQUÍ ESTÁ EL TRUCO:
//       // Cuando el servidor devuelve el usuario con isSelected: true,
//       // HeroUI automáticamente lo pinta como marcado (check).
//       isSelected={user.isSelected}
//     >
//       {user.name}
//     </Checkbox>
//   ));
// }

// import { useForm, Controller } from "react-hook-form";

// // Tipado básico para el ejemplo
// interface InventoryForm {
//   productId: string;
//   quantity: number;
//   type: 'IN' | 'OUT';
// }

// export const ProductSelector = ({ products }) => {
//   const { control, handleSubmit } = useForm<InventoryForm>();

//   const onSubmit = (data: InventoryForm) => {
//     console.log("Data enviada:", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         <Controller
//           name="productId"
//           control={control}
//           rules={{ required: "Debes seleccionar un producto" }}
//           render={({ field, fieldState }) => (
//             <>
//               {products.map((product) => {
//                 const isSelected = field.value === product.id;

//                 return (
//                   <div
//                     key={product.id}
//                     onClick={() => field.onChange(product.id)} // Actualiza el valor en RHF
//                     className={`cursor-pointer border-2 p-4 rounded-xl transition-all ${
//                       isSelected
//                         ? "border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-200"
//                         : "border-gray-200 hover:border-blue-300"
//                     }`}
//                   >
//                     <img
//                       src={product.imageUrl || "/placeholder.png"}
//                       alt={product.name}
//                       className="w-full h-32 object-cover rounded-md mb-2"
//                     />
//                     <h3 className="font-bold text-gray-800">{product.name}</h3>
//                     <p className="text-sm text-gray-500">Stock: {product.stock}</p>

//                     {/* Indicador visual de selección */}
//                     <div className="mt-2 flex justify-end">
//                       <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
//                         isSelected ? "bg-blue-500 border-blue-500" : "border-gray-300"
//                       }`}>
//                         {isSelected && <span className="text-white text-xs">✓</span>}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//               {fieldState.error && (
//                 <p className="text-red-500 text-sm col-span-full">
//                   {fieldState.error.message}
//                 </p>
//               )}
//             </>
//           )}
//         />
//       </div>

//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//         Registrar Movimiento
//       </button>
//     </form>
//   );
// };

// export async function getMany(): Promise<Category[]> {
//   return prisma.category.findMany({
//     select: categorySelect
//   })
// }

// export async function getById(categoryId: Id): Promise<Category> {
//   const id = validateId(categoryId)

//   const category = await prisma.category.findUnique({
//     where: { id },
//     select: categorySelect
//   })

//   if (!category) throw new AppError('Categoria no encontrado.', true)

//   return category
// }

// export async function create(rawData: CreateCategory): Promise<Category> {
//   const data = validateData(createCategorySchema, rawData)
//   const existingCategory = await prisma.category.findUnique({
//     where: { name: data.name }
//   })

//   if (existingCategory) {
//     throw new AppError('Ya hay una categoria con ese nombre.', true)
//   }

//   return prisma.category.create({
//     data,
//     select: categorySelect
//   })
// }

// export async function update(
//   categoryId: Id,
//   rawData: UpdateCategory
// ): Promise<Category> {
//   const id = validateId(categoryId)
//   const data = validateData(updateCategorySchema, rawData)

//   if (data.name) {
//     const existingCategory = await prisma.category.findUnique({
//       where: { name: data.name, NOT: { id } }
//     })

//     if (existingCategory)
//       throw new AppError('Ya hay una categoria con ese nombre.', true)
//   }

//   return await prisma.category.update({
//     where: { id },
//     data,
//     select: categorySelect
//   })
// }

// export async function remove(categoryId: Id): Promise<Category> {
//   const id = validateId(categoryId)

//   return await prisma.category.delete({
//     where: { id },
//     select: categorySelect
//   })
// }

// export async function deleteMany() {
//   return await prisma.category.deleteMany({
//     where: { isSelect: true }
//   })
// }

// export async function updateStatus(
//   categoryId: Id,
//   isActive: boolean
// ): Promise<Category> {
//   const id = validateId(categoryId)
//   const status = validateStatus(isActive)

//   return await prisma.category.update({
//     where: { id },
//     data: { isActive: status },
//     select: categorySelect
//   })
// }

// export async function updateSelect(
//   categoryId: Id,
//   isSelect: boolean
// ): Promise<Category> {
//   const id = validateId(categoryId)
//   const status = validateStatus(isSelect)

//   return await prisma.category.update({
//     where: { id },
//     data: {
//       isSelect: status
//     },
//     select: categorySelect
//   })
// }
