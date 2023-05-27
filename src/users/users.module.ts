import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { ValidatorService } from 'src/common/validators';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ValidatorService],
  imports: [PrismaModule]
})
export class UsersModule {}
