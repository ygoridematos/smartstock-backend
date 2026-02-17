/*
  Warnings:

  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- 1. Adiciona a coluna permitindo nulo
ALTER TABLE "Product" ADD COLUMN "price" DOUBLE PRECISION;

-- 2. Preenche os registros existentes com um valor padrão (ex: 0)
UPDATE "Product" SET "price" = 0 WHERE "price" IS NULL;

-- 3. Agora torna a coluna NOT NULL
ALTER TABLE "Product" ALTER COLUMN "price" SET NOT NULL;