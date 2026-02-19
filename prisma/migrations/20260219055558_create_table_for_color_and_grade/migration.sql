/*
  Warnings:

  - Added the required column `colorId` to the `Bettas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gradeId` to the `Bettas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantId` to the `Bettas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bettas" ADD COLUMN     "colorId" INTEGER NOT NULL,
ADD COLUMN     "gradeId" INTEGER NOT NULL,
ADD COLUMN     "variantId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bettas" ADD CONSTRAINT "Bettas_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bettas" ADD CONSTRAINT "Bettas_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bettas" ADD CONSTRAINT "Bettas_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
