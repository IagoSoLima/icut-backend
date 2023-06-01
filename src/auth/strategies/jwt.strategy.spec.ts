import { JwtStrategy } from '~/auth/strategies/jwt.strategy';

describe('JwtStrategy', () => {
  it('should return user-payload data', () => {
    const jwt = new JwtStrategy();

    const response = jwt.validate({
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
