import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '~/auth/strategies/jwt.strategy';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn()
          }
        },
        JwtStrategy
      ]
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  it('should return user-payload data', () => {
    const response = jwtStrategy.validate({
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
