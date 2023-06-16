import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppLogger } from '~/app.logger';
import { LocalStrategy } from '~/auth/strategies/local.strategy';
import { UsersRepository } from '~/users/users.repository';
import { AuthService } from '../auth.service';

describe('LocalStrategy', () => {
  let authService: AuthService;
  let localStrategy: LocalStrategy;
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
        LocalStrategy
      ]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    localStrategy = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(localStrategy).toBeDefined();
  });

  it('should return user-payload data', async () => {
    authService.validateUser = jest.fn().mockResolvedValue({
      email: 'email@email',
      password: 'XXXX'
    });

    const response = await localStrategy.validate('email@email', 'XXXX');

    expect(response).toHaveProperty('email');
    expect(response.email).toEqual('email@email');
  });

  it('should throw error if user not found', async () => {
    authService.validateUser = jest.fn().mockResolvedValue(null);

    await expect(
      localStrategy.validate('email@email', 'XXXX')
    ).rejects.toThrow();
  });
});
