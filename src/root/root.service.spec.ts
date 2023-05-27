import { Test, TestingModule } from '@nestjs/testing';
import { RootService } from '~/root/root.service';

describe('RootService', () => {
  let service: RootService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [RootService]
    }).compile();

    service = app.get<RootService>(RootService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(service.getHello()).toBe('Hello World!');
    });
  });
});
