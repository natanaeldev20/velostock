/*
  Warnings:

  - Added the required column `priceAtMove` to the `InventoryMovement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MovementReason" AS ENUM ('COMPRA', 'VENTA', 'DEVOLVER', 'DAÑO', 'AUDITORÍA_FÍSICA');

-- AlterTable
ALTER TABLE "InventoryMovement" ADD COLUMN     "priceAtMove" DECIMAL(10,2) NOT NULL;
