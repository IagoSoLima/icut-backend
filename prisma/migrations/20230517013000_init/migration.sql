/*
  Warnings:

  - You are about to drop the `EMPLOYEES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ESTABLISHMENTS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ESTABLISHMENT_PAYMENTS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SCHEDULES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SERVICES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TELEPHONES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TYPE_PAYMENT` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TYPE_SERVICE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TYPE_USER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USERS` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EMPLOYEES" DROP CONSTRAINT "EMPLOYEES_FK_ID_ESTABLISHMENT_fkey";

-- DropForeignKey
ALTER TABLE "EMPLOYEES" DROP CONSTRAINT "EMPLOYEES_FK_ID_USER_fkey";

-- DropForeignKey
ALTER TABLE "ESTABLISHMENT_PAYMENTS" DROP CONSTRAINT "ESTABLISHMENT_PAYMENTS_FK_ID_ESTABLISHMENT_fkey";

-- DropForeignKey
ALTER TABLE "ESTABLISHMENT_PAYMENTS" DROP CONSTRAINT "ESTABLISHMENT_PAYMENTS_FK_ID_TYPE_PAYMENT_fkey";

-- DropForeignKey
ALTER TABLE "SCHEDULES" DROP CONSTRAINT "SCHEDULES_FK_ID_SERVICE_fkey";

-- DropForeignKey
ALTER TABLE "SCHEDULES" DROP CONSTRAINT "SCHEDULES_FK_ID_TYPE_PAYMENT_fkey";

-- DropForeignKey
ALTER TABLE "SCHEDULES" DROP CONSTRAINT "SCHEDULES_FK_ID_USER_fkey";

-- DropForeignKey
ALTER TABLE "SERVICES" DROP CONSTRAINT "SERVICES_FK_ID_ESTABLISHMENT_fkey";

-- DropForeignKey
ALTER TABLE "SERVICES" DROP CONSTRAINT "SERVICES_FK_ID_TYPE_SERVICE_fkey";

-- DropForeignKey
ALTER TABLE "TELEPHONES" DROP CONSTRAINT "TELEPHONES_FK_ID_USER_fkey";

-- DropForeignKey
ALTER TABLE "USERS" DROP CONSTRAINT "USERS_FK_ID_TYPE_USER_fkey";

-- DropTable
DROP TABLE "EMPLOYEES";

-- DropTable
DROP TABLE "ESTABLISHMENTS";

-- DropTable
DROP TABLE "ESTABLISHMENT_PAYMENTS";

-- DropTable
DROP TABLE "SCHEDULES";

-- DropTable
DROP TABLE "SERVICES";

-- DropTable
DROP TABLE "TELEPHONES";

-- DropTable
DROP TABLE "TYPE_PAYMENT";

-- DropTable
DROP TABLE "TYPE_SERVICE";

-- DropTable
DROP TABLE "TYPE_USER";

-- DropTable
DROP TABLE "USERS";

-- CreateTable
CREATE TABLE "Users" (
    "id_user" SERIAL NOT NULL,
    "ds_username" TEXT NOT NULL,
    "ds_password" TEXT NOT NULL,
    "ds_email" TEXT NOT NULL,
    "ds_user_name" TEXT NOT NULL,
    "ds_user_lastname" TEXT NOT NULL,
    "nr_cpf" TEXT NOT NULL,
    "fk_id_type_user" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Type_user" (
    "id_type_user" SERIAL NOT NULL,
    "ds_type_user" TEXT NOT NULL,

    CONSTRAINT "Type_user_pkey" PRIMARY KEY ("id_type_user")
);

-- CreateTable
CREATE TABLE "Telephones" (
    "id_telephone" SERIAL NOT NULL,
    "nr_telephone" TEXT NOT NULL,
    "ds_telephone" TEXT NOT NULL,
    "fk_id_user" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Telephones_pkey" PRIMARY KEY ("id_telephone")
);

-- CreateTable
CREATE TABLE "Employees" (
    "id_employees" SERIAL NOT NULL,
    "fk_id_user" INTEGER NOT NULL,
    "fk_id_establishment" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id_employees")
);

-- CreateTable
CREATE TABLE "Establishments" (
    "id_establishment" SERIAL NOT NULL,
    "ds_corporate_name" TEXT NOT NULL,
    "ds_representative_name" TEXT NOT NULL,
    "nr_cnpj" TEXT NOT NULL,
    "ds_email" TEXT NOT NULL,
    "establishment_logo" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Establishments_pkey" PRIMARY KEY ("id_establishment")
);

-- CreateTable
CREATE TABLE "Establishment_payments" (
    "id_establishment_paymente" SERIAL NOT NULL,
    "fk_id_type_payment" INTEGER NOT NULL,
    "fk_id_establishment" INTEGER NOT NULL,

    CONSTRAINT "Establishment_payments_pkey" PRIMARY KEY ("id_establishment_paymente")
);

-- CreateTable
CREATE TABLE "Type_payment" (
    "id_type_payment" SERIAL NOT NULL,
    "ds_type_payment" TEXT NOT NULL,

    CONSTRAINT "Type_payment_pkey" PRIMARY KEY ("id_type_payment")
);

-- CreateTable
CREATE TABLE "Type_service" (
    "id_type_service" SERIAL NOT NULL,
    "ds_type_service" TEXT NOT NULL,

    CONSTRAINT "Type_service_pkey" PRIMARY KEY ("id_type_service")
);

-- CreateTable
CREATE TABLE "Services" (
    "id_service" SERIAL NOT NULL,
    "ds_service" TEXT NOT NULL,
    "nr_valor" DOUBLE PRECISION NOT NULL,
    "time_duration" TIMESTAMP(3) NOT NULL,
    "fk_id_establishment" INTEGER NOT NULL,
    "fk_id_type_service" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id_service")
);

-- CreateTable
CREATE TABLE "Schedules" (
    "id_schedules" SERIAL NOT NULL,
    "dt_schedule_initial" TIMESTAMP(3) NOT NULL,
    "dt_schedule_end" TIMESTAMP(3) NOT NULL,
    "fk_id_service" INTEGER NOT NULL,
    "fk_id_user" INTEGER NOT NULL,
    "fk_id_type_payment" INTEGER NOT NULL,

    CONSTRAINT "Schedules_pkey" PRIMARY KEY ("id_schedules")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_nr_cpf_key" ON "Users"("nr_cpf");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_fk_id_type_user_fkey" FOREIGN KEY ("fk_id_type_user") REFERENCES "Type_user"("id_type_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telephones" ADD CONSTRAINT "Telephones_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "Users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "Users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_fk_id_establishment_fkey" FOREIGN KEY ("fk_id_establishment") REFERENCES "Establishments"("id_establishment") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Establishment_payments" ADD CONSTRAINT "Establishment_payments_fk_id_type_payment_fkey" FOREIGN KEY ("fk_id_type_payment") REFERENCES "Type_payment"("id_type_payment") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Establishment_payments" ADD CONSTRAINT "Establishment_payments_fk_id_establishment_fkey" FOREIGN KEY ("fk_id_establishment") REFERENCES "Establishments"("id_establishment") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_fk_id_establishment_fkey" FOREIGN KEY ("fk_id_establishment") REFERENCES "Establishments"("id_establishment") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_fk_id_type_service_fkey" FOREIGN KEY ("fk_id_type_service") REFERENCES "Type_service"("id_type_service") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_fk_id_service_fkey" FOREIGN KEY ("fk_id_service") REFERENCES "Services"("id_service") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "Users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_fk_id_type_payment_fkey" FOREIGN KEY ("fk_id_type_payment") REFERENCES "Type_payment"("id_type_payment") ON DELETE RESTRICT ON UPDATE CASCADE;
