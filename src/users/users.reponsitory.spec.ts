import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '~/common/prisma';
import { UsersRepository } from './users.repository';

describe('UsersRepository', () => {
  let prismaService: PrismaService;
  let usersRepository: UsersRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {
            users: {
              findUnique: jest.fn(),
              findFirst: jest.fn()
            }
          }
        },
        UsersRepository
      ]
    }).compile();
    prismaService = module.get<PrismaService>(PrismaService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  it('should call get', async () => {
    const findUniqueSpy = jest
      .spyOn(prismaService.users, 'findUnique')
      .mockReturnValueOnce({} as any);
    const response = await usersRepository.get({
      id_user: 1
    });
    expect(findUniqueSpy).toHaveBeenCalled();
    expect(response).toEqual({});
  });

  it('should call getByEmail', async () => {
    const findFirstSpy = jest
      .spyOn(prismaService.users, 'findFirst')
      .mockReturnValueOnce({} as any);
    const response = await usersRepository.getByEmail('XXXXXXXXXXXXX');

    expect(findFirstSpy).toHaveBeenCalled();
    expect(response).toEqual({});
  });
});
