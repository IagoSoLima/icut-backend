import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '~/common/prisma';
import { ValidatorService } from '~/common/validators';
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
        }
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
