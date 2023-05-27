import { Module } from '@nestjs/common';
import { RootModule } from '~/root/root.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, PrismaModule, RootModule, AuthModule],
  providers: []
})
export class AppModule {}
