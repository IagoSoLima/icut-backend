import { Module } from '@nestjs/common';
import { RootModule } from '~/root/root.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, RootModule, AuthModule],
  providers: []
})
export class AppModule {}
