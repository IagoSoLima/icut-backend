import { RefreshTokenStrategy } from '~/auth/strategies';

describe('RefreshTokenStrategy', () => {
  it('should return user-payload data', async () => {
    const jwt = new RefreshTokenStrategy();

    const response = await jwt.validate({
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
