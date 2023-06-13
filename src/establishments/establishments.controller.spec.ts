import { Test, TestingModule } from '@nestjs/testing';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/prisma';
import { ValidatorService } from '~/common/validators';
import { EstablishmentsRepository } from '~/establishments/establishments.repository';
import { EstablishmentsController } from './establishments.controller';
import { EstablishmentsService } from './establishments.service';

describe('EstablishmentsController', () => {
  let controller: EstablishmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstablishmentsController],
      providers: [
        EstablishmentsService,
        EstablishmentsRepository,
        ValidatorService,
        PrismaService,
        AppLogger
      ]
    }).compile();

    controller = module.get<EstablishmentsController>(EstablishmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
