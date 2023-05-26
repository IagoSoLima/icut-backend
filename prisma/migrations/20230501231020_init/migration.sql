/*
  Warnings:

  - Added the required column `ID_TYPE_USER` to the `USER` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "USER" ADD COLUMN     "ID_TYPE_USER" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "USER" ADD CONSTRAINT "USER_ID_TYPE_USER_fkey" FOREIGN KEY ("ID_TYPE_USER") REFERENCES "TYPE_USER"("ID_TYPE_USER") ON DELETE RESTRICT ON UPDATE CASCADE;
