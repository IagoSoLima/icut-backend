import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

jest.mock('class-transformer', () => {
  return {
    ...jest.requireActual('class-transformer'),
    Type: typeReturn => {
      typeReturn();
      return jest.requireActual('class-transformer').Type(typeReturn);
    }
  };
});

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            refreshToken: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should call login with correct params', async () => {
      const payload = {
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
      } as any;

      const loginSpy = jest
        .spyOn(service, 'login')
        .mockImplementationOnce(async () => payload);

      await controller.login(payload);
      expect(loginSpy).toHaveBeenCalledWith(payload);
    });
    it('should call login and throw error', async () => {
      const payload = {
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
      } as any;

      jest
        .spyOn(service, 'login')
        .mockImplementationOnce(async () => Promise.reject(new Error()));

      await expect(controller.login(payload)).rejects.toThrowError();
    });
  });

  describe('refreshToken', () => {
    it('should call refreshToken with correct params', async () => {
      const payload = {
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
      } as any;

      const refreshTokenSpy = jest
        .spyOn(service, 'refreshToken')
        .mockImplementationOnce(async () => payload);

      await controller.refresh(payload);
      expect(refreshTokenSpy).toHaveBeenCalledWith(payload);
    });
    it('should call refreshToken and throw error', async () => {
      const payload = {
        id: 'XXXXXXXXXXXXX',
        email: 'XXXXXXXXXXXXX',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        lastName: 'XXXXXXXXXXXXX',
        name: 'Teste',
        userName: 'XXXXX'
      } as any;

      jest
        .spyOn(service, 'refreshToken')
        .mockImplementationOnce(async () => Promise.reject(new Error()));

      await expect(controller.refresh(payload)).rejects.toThrowError();
    });
  });
});
