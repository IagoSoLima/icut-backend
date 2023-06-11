import { Test, TestingModule } from '@nestjs/testing';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/prisma';
import { TelephoneRepository } from './telephone.repository';
import { TelephonesController } from './telephones.controller';
import { TelephoneService } from './telephones.service';

describe('TelephonesController', () => {
  let controller: TelephonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelephonesController],
      providers: [
        TelephoneService,
        TelephoneRepository,
        PrismaService,
        AppLogger
      ]
    }).compile();

    controller = module.get<TelephonesController>(TelephonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
