/*
  Warnings:

  - You are about to drop the column `cantidad` on the `InventoryMovement` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `InventoryMovement` table. All the data in the column will be lost.
  - You are about to drop the column `precio` on the `Product` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `InventoryMovement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryMovement" DROP COLUMN "cantidad",
DROP COLUMN "fecha",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "precio",
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL;
