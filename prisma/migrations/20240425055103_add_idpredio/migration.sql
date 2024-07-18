/*
  Warnings:

  - Added the required column `id_predio` to the `consultas_predios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "consultas_predios" ADD COLUMN     "id_predio" INTEGER NOT NULL;
