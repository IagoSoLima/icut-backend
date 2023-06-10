-- CreateTable
CREATE TABLE "Users" (
    "id_user" SERIAL NOT NULL,
    "ds_username" TEXT NOT NULL,
    "ds_password" TEXT NOT NULL,
    "ds_email" TEXT NOT NULL,
    "ds_user_name" TEXT NOT NULL,
    "ds_user_lastname" TEXT NOT NULL,
    "nr_cpf" TEXT NOT NULL,
    "fk_id_type_user" INTEGER NOT NULL DEFAULT 1,
    "avatar_image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Type_user" (
    "id_type_user" SERIAL NOT NULL,
    "ds_type_user" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

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
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Telephones_pkey" PRIMARY KEY ("id_telephone")
);

-- CreateTable
CREATE TABLE "Employees" (
    "id_employees" SERIAL NOT NULL,
    "fk_id_user" INTEGER NOT NULL,
    "fk_id_establishment" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id_employees")
);

-- CreateTable
CREATE TABLE "Establishments" (
    "id_establishment" SERIAL NOT NULL,
    "ds_corporate_name" TEXT NOT NULL,
    "ds_representative_name" TEXT NOT NULL,
    "nr_cnpj" TEXT NOT NULL,
    "ds_email" TEXT NOT NULL,
    "establishment_logo" TEXT NOT NULL,
    "id_user_administrator" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Establishments_pkey" PRIMARY KEY ("id_establishment")
);

-- CreateTable
CREATE TABLE "Establishment_payments" (
    "id_establishment_paymente" SERIAL NOT NULL,
    "fk_id_type_payment" INTEGER NOT NULL,
    "fk_id_establishment" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Establishment_payments_pkey" PRIMARY KEY ("id_establishment_paymente")
);

-- CreateTable
CREATE TABLE "Type_payment" (
    "id_type_payment" SERIAL NOT NULL,
    "ds_type_payment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Type_payment_pkey" PRIMARY KEY ("id_type_payment")
);

-- CreateTable
CREATE TABLE "Type_service" (
    "id_type_service" SERIAL NOT NULL,
    "ds_type_service" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id_service")
);

-- CreateTable
CREATE TABLE "Schedules" (
    "id_schedules" SERIAL NOT NULL,
    "dt_schedule_initial" TIMESTAMP(3) NOT NULL,
    "dt_schedule_end" TIMESTAMP(3) NOT NULL,
    "fk_id_service" INTEGER,
    "fk_id_user" INTEGER,
    "fk_id_type_payment" INTEGER,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Schedules_pkey" PRIMARY KEY ("id_schedules")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_ds_username_key" ON "Users"("ds_username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_ds_email_key" ON "Users"("ds_email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_nr_cpf_key" ON "Users"("nr_cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_fk_id_user_key" ON "Employees"("fk_id_user");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_fk_id_type_user_fkey" FOREIGN KEY ("fk_id_type_user") REFERENCES "Type_user"("id_type_user") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telephones" ADD CONSTRAINT "Telephones_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "Users"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "Users"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_fk_id_establishment_fkey" FOREIGN KEY ("fk_id_establishment") REFERENCES "Establishments"("id_establishment") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Establishments" ADD CONSTRAINT "Establishments_id_user_administrator_fkey" FOREIGN KEY ("id_user_administrator") REFERENCES "Users"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Establishment_payments" ADD CONSTRAINT "Establishment_payments_fk_id_type_payment_fkey" FOREIGN KEY ("fk_id_type_payment") REFERENCES "Type_payment"("id_type_payment") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Establishment_payments" ADD CONSTRAINT "Establishment_payments_fk_id_establishment_fkey" FOREIGN KEY ("fk_id_establishment") REFERENCES "Establishments"("id_establishment") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_fk_id_establishment_fkey" FOREIGN KEY ("fk_id_establishment") REFERENCES "Establishments"("id_establishment") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_fk_id_type_service_fkey" FOREIGN KEY ("fk_id_type_service") REFERENCES "Type_service"("id_type_service") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_fk_id_service_fkey" FOREIGN KEY ("fk_id_service") REFERENCES "Services"("id_service") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "Users"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_fk_id_type_payment_fkey" FOREIGN KEY ("fk_id_type_payment") REFERENCES "Type_payment"("id_type_payment") ON DELETE SET NULL ON UPDATE CASCADE;
