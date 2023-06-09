import { Test, TestingModule } from '@nestjs/testing';
import { TelephonesController } from './telephones.controller';
import { TelephoneService } from './telephones.service';
import { PrismaService } from '~/common/prisma';
import { TelephoneRepository } from './telephone.repository';

describe('TelephonesController', () => {
  let controller: TelephonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelephonesController],
      providers: [TelephoneService, TelephoneRepository, PrismaService]
    }).compile();

    controller = module.get<TelephonesController>(TelephonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
