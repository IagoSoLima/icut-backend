-- AlterTable
ALTER TABLE "Schedules" ADD COLUMN     "fk_id_employee" INTEGER;

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_fk_id_employee_fkey" FOREIGN KEY ("fk_id_employee") REFERENCES "Employees"("id_employees") ON DELETE SET NULL ON UPDATE CASCADE;
