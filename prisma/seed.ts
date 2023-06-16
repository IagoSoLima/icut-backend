import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { IS_DEV } from '../src/app.vars';

const prisma = new PrismaClient();

const createUser = async () => {
  await prisma.users.deleteMany({
    where: {
      ds_email: 'teste-icut@tuamaeaquelaursa.com'
    }
  });

  await prisma.users.create({
    data: {
      ds_user_name: 'Teste',
      ds_user_lastname: 'Silva',
      ds_email: 'teste-icut@tuamaeaquelaursa.com',
      ds_password: bcrypt.hashSync('1234'),
      ds_username: 'teste',
      fk_id_type_user: 1,
      active: true,
      nr_cpf: '11111111111',
      telephone: {
        create: {
          ds_telephone: 'Casa',
          nr_telephone: '11111111111'
        }
      }
    }
  });
};

const createUserAdmin = async () => {
  await prisma.users.deleteMany({
    where: {
      ds_email: 'teste-icut-company@tuamaeaquelaursa.com'
    }
  });

  const user = await prisma.users.create({
    data: {
      ds_user_name: 'Empresa Teste',
      ds_user_lastname: 'Silva',
      ds_email: 'teste-icut-company@tuamaeaquelaursa.com',
      ds_password: bcrypt.hashSync('1234'),
      ds_username: 'teste-company',
      fk_id_type_user: 2,
      active: true,
      nr_cpf: '22222222222',
      telephone: {
        create: {
          ds_telephone: 'Casa',
          nr_telephone: '11222222222'
        }
      }
    }
  });

  const establishment = await prisma.establishments.create({
    data: {
      nr_cnpj: '22222222222',
      active: true,
      ds_corporate_name: 'Estabeleciomento nome teste',
      ds_email: 'teste-icut-company@tuamaeaquelaursa.com',
      ds_representative_name: 'Empresa Teste',
      id_user_administrator: user.id_user,
      establishment_logo:
        'https://cdn.leroymerlin.com.br/products/kit_6_placas_decorativas_barbearia_barber_shop_salao_mdf_1567590343_992f_600x600.jpg',
      employee: {
        create: [
          {
            fk_id_user: user.id_user
          }
        ]
      }
    }
  });

  await prisma.addresses.create({
    data: {
      ds_address: 'Rua maringá',
      ds_city: 'Itaquaquecetuba',
      ds_state: 'SP',
      nr_cep: '07070-000',
      fk_id_establishment: establishment.id_establishment
    }
  });

  await prisma.establishment_payments.create({
    data: {
      fk_id_establishment: establishment.id_establishment,
      fk_id_type_payment: 1
    }
  });

  return {
    userId: user.id_user,
    establishmentId: establishment.id_establishment
  };
};

const createServices = async (establishmentId: number) => {
  await prisma.services.createMany({
    data: [
      {
        fk_id_type_service: 1,
        ds_service: 'Corte de cabelo com tesoura e máquina',
        time_duration: '00:30:00',
        nr_valor: 50,
        fk_id_establishment: establishmentId,
        active: true
      },
      {
        fk_id_type_service: 2,
        ds_service: 'Corte e/ou manutenção da barba com hidratação',
        time_duration: '01:30:00',
        nr_valor: 30,
        fk_id_establishment: establishmentId,
        active: true
      },
      {
        fk_id_type_service: 2,
        ds_service: 'Corte e/ou manutenção da barba sem hidratação',
        time_duration: '00:30:00',
        nr_valor: 20,
        fk_id_establishment: establishmentId,
        active: true
      }
    ]
  });
};

const main = async () => {
  const usersType = await prisma.type_user.findMany();

  if (usersType.length === 0) {
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
  }

  await prisma.type_payment.deleteMany();
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

  await prisma.type_service.deleteMany();
  await prisma.type_service.createMany({
    data: [
      {
        id_type_service: 1,
        ds_type_service: 'Cabelo'
      },
      {
        id_type_service: 2,
        ds_type_service: 'Barba e bigode'
      },
      {
        id_type_service: 3,
        ds_type_service: 'Tingimento e Luzes'
      },
      {
        id_type_service: 4,
        ds_type_service: 'Manicure'
      },
      {
        id_type_service: 5,
        ds_type_service: 'Pedicure'
      },
      {
        id_type_service: 6,
        ds_type_service: 'Outros'
      }
    ]
  });

  if (IS_DEV) {
    await createUser();
    const admin = await createUserAdmin();
    await createServices(admin.establishmentId);
  }
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect()); // eslint-disable-line
