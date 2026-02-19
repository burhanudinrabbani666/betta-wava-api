/*
  Warnings:

  - Added the required column `HeightCm` to the `Bettas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chemical` to the `Bettas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `daily` to the `Bettas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feed` to the `Bettas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodType` to the `Bettas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Bettas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageSmall` to the `Bettas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nature` to the `Bettas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phMax` to the `Bettas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phMin` to the `Bettas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperatureCelcius` to the `Bettas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `widthCm` to the `Bettas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bettas" ADD COLUMN     "HeightCm" INTEGER NOT NULL,
ADD COLUMN     "chemical" TEXT NOT NULL,
ADD COLUMN     "daily" TEXT NOT NULL,
ADD COLUMN     "feed" TEXT NOT NULL,
ADD COLUMN     "foodType" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "imageSmall" TEXT NOT NULL,
ADD COLUMN     "nature" TEXT NOT NULL,
ADD COLUMN     "phMax" INTEGER NOT NULL,
ADD COLUMN     "phMin" INTEGER NOT NULL,
ADD COLUMN     "temperatureCelcius" INTEGER NOT NULL,
ADD COLUMN     "widthCm" INTEGER NOT NULL;
