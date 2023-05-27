import { Module } from '@nestjs/common';
import { TelephonesService } from './telephones.service';
import { TelephonesController } from './telephones.controller';

@Module({
  controllers: [TelephonesController],
  providers: [TelephonesService]
})
export class TelephonesModule {}
