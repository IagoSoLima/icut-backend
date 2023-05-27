import { Module } from '@nestjs/common';
import { RootModule } from '~/root/root.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TelephonesModule } from './telephones/telephones.module';

@Module({
  imports: [UsersModule, TelephonesModule, RootModule, AuthModule],
  controllers: [],
  providers: []
})
export class AppModule {}
