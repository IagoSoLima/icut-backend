-- AlterTable
ALTER TABLE "Schedules" ADD COLUMN     "fk_id_establishment" INTEGER;

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_fk_id_establishment_fkey" FOREIGN KEY ("fk_id_establishment") REFERENCES "Establishments"("id_establishment") ON DELETE SET NULL ON UPDATE CASCADE;
