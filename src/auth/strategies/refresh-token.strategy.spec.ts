import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenStrategy } from '~/auth/strategies';

describe('RefreshTokenStrategy', () => {
  let refreshTokenStrategy: RefreshTokenStrategy;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtService, RefreshTokenStrategy]
    }).compile();

    refreshTokenStrategy =
      module.get<RefreshTokenStrategy>(RefreshTokenStrategy);
  });

  it('should be defined', () => {
    expect(refreshTokenStrategy).toBeDefined();
  });

  it('should return user-payload data', async () => {
    const response = await refreshTokenStrategy.validate({
      id: 'XXXXXXXXXXXXX',
      email: 'email@email',
      lastName: 'da Silva',
      name: 'Teste',
      userName: 'teste',
      exp: new Date().getTime(),
      iat: new Date().getTime()
    });

    expect(response).toHaveProperty('email');
    expect(response.email).toEqual('email@email');
  });
});
