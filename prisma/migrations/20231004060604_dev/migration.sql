/*
  Warnings:

  - The primary key for the `candidates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `candidates` table. All the data in the column will be lost.
  - Added the required column `id` to the `candidates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidates" DROP CONSTRAINT "candidates_pkey",
DROP COLUMN "name",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "candidates_pkey" PRIMARY KEY ("id");
