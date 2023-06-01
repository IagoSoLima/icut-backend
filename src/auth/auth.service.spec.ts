import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppLogger } from '~/app.logger';
import { UsersRepository } from '~/users/users.repository';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy, RefreshTokenStrategy } from './strategies';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: UsersRepository;
  let logger: AppLogger;
  let localStrategy: LocalStrategy;
  let refreshTokenStrategy: RefreshTokenStrategy;
  let jwtStrategy: JwtStrategy;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        AppLogger,
        {
          provide: UsersRepository,
          useValue: {
            getByEmail: jest.fn()
          }
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn()
          }
        },
        {
          provide: LocalStrategy,
          useValue: jest.fn()
        },
        {
          provide: RefreshTokenStrategy,
          useValue: jest.fn()
        },
        {
          provide: JwtStrategy,
          useValue: jest.fn()
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    logger = module.get<AppLogger>(AppLogger);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    refreshTokenStrategy =
      module.get<RefreshTokenStrategy>(RefreshTokenStrategy);
    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(logger).toBeDefined();
    expect(usersRepository).toBeDefined();
    expect(localStrategy).toBeDefined();
    expect(refreshTokenStrategy).toBeDefined();
    expect(jwtStrategy).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should call usersRepository.getByEmail', async () => {
      const getByEmailSpy = jest.spyOn(usersRepository, 'getByEmail');
      await service.validateUser({
        email: 'XXXXXXXXXXXXX',
        password: 'test'
      });
      expect(getByEmailSpy).toHaveBeenCalledWith('XXXXXXXXXXXXX');
    });

    it('should return null if user not found', async () => {
      jest.spyOn(usersRepository, 'getByEmail').mockResolvedValue(null);
      const result = await service.validateUser({
        email: 'XXXXXXXXXXXXX',
        password: 'test'
      });
      expect(result).toBeNull();
    });

    it('should return user if user found', async () => {
      const user = {
        id: 'XXXXXXXXXXXXX',
        email: 'XXXXXXXXXXXXX',
        active: true,
        ds_password: 'XXXX'
      } as any;

      usersRepository.getByEmail = jest
        .fn()
        .mockImplementationOnce(async () => user);

      const result = await service.validateUser({
        email: 'XXXXXXXXXXXXX',
        password: 'XXXX'
      });
      expect(result).toHaveProperty('email');
    });
  });

  describe('login', () => {
    it('should call jwtService.signAsync', async () => {
      const signSpy = jest.spyOn(jwtService, 'signAsync');
      await service.login({
        id: 'XXXXXXXXXXXXX',
        email: 'XXXXXXXXXXXXX',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        lastName: 'XXXXXXXXXXXXX',
        name: 'Teste',
        userName: 'teste',
        userType: 1
      });
      expect(signSpy).toHaveBeenCalled();
    });
    it('should return token', async () => {
      jwtService.signAsync = jest.fn().mockResolvedValue('XXXXXXXXXXXXX');

      const result = await service.login({
        id: 'XXXXXXXXXXXXX',
        email: 'XXXXXXXXXXXXX',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        lastName: 'XXXXXXXXXXXXX',
        name: 'Teste',
        userName: 'XXXXX',
        userType: 1
      });
      expect(result).toHaveProperty('accessToken');
    });
  });

  describe('refreshToken', () => {
    it('should call jwtService.signAsync', async () => {
      const signSpy = jest.spyOn(jwtService, 'signAsync');
      await service.refreshToken({
        id: 'XXXXXXXXXXXXX',
        email: 'XXXXXXXXXXXXX',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        lastName: 'XXXXXXXXXXXXX',
        name: 'Teste',
        userName: 'XXXXX',
        userType: 1
      });
      expect(signSpy).toHaveBeenCalled();
    });
    it('should return token', async () => {
      jwtService.signAsync = jest.fn().mockResolvedValue('XXXXXXXXXXXXX');

      const token = await service.refreshToken({
        id: 'XXXXXXXXXXXXX',
        email: 'XXXXXXXXXXXXX',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        lastName: 'XXXXXXXXXXXXX',
        name: 'Teste',
        userName: 'XXXXX',
        userType: 1
      });
      expect(token).toHaveProperty('accessToken');
    });
  });
});
