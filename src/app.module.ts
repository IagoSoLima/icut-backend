import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { TelephonesModule } from './telephones/telephones.module';

@Module({
  imports: [UsersModule, PrismaModule, TelephonesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
