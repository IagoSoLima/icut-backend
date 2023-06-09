import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.type_user.deleteMany({});
  await prisma.type_user.createMany({
    data: [
      {
        id_type_user: 1,
        ds_type_user: 'Cliente'
      },
      {
        id_type_user: 2,
        ds_type_user: 'Administrador/Gerente'
      },
      {
        id_type_user: 3,
        ds_type_user: 'Funcionário'
      }
    ]
  });

  await prisma.type_payment.deleteMany({});
  await prisma.type_payment.createMany({
    data: [
      {
        id_type_payment: 1,
        ds_type_payment: 'À combinar'
      },
      {
        id_type_payment: 2,
        ds_type_payment: 'Pix'
      },
      {
        id_type_payment: 3,
        ds_type_payment: 'Débito'
      },
      {
        id_type_payment: 4,
        ds_type_payment: 'Crédito'
      }
    ]
  });
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect()); // eslint-disable-line
