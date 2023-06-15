import { Test, TestingModule } from '@nestjs/testing';
import { AddressesRepository } from '~/addresses/addresses.repository';
import { AddressesService } from '~/addresses/addresses.service';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/prisma';
import { ValidatorService } from '~/common/validators';
import { EmployeesRepository } from '~/employees/employees.repository';
import { EmployeesService } from '~/employees/employees.service';
import { EstablishmentsRepository } from '~/establishments/establishments.repository';
import { EstablishmentsService } from '~/establishments/establishments.service';
import { TelephoneRepository } from '~/telephones/telephone.repository';
import { TelephoneService } from '~/telephones/telephones.service';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: ValidatorService,
          useValue: {
            IsFieldRegistered: jest.fn()
          }
        },

        {
          provide: UsersRepository,
          useValue: jest.fn()
        },

        {
          provide: PrismaService,
          useValue: jest.fn()
        },
        EstablishmentsService,
        EstablishmentsRepository,
        TelephoneService,
        TelephoneRepository,
        EmployeesService,
        EmployeesRepository,
        AddressesService,
        AddressesRepository,
        AppLogger
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
