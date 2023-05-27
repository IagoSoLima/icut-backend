import { Test, TestingModule } from '@nestjs/testing';
import { TelephonesController } from './telephones.controller';
import { TelephonesService } from './telephones.service';

describe('TelephonesController', () => {
  let controller: TelephonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelephonesController],
      providers: [TelephonesService]
    }).compile();

    controller = module.get<TelephonesController>(TelephonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
