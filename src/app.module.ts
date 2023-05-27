import { Module } from '@nestjs/common';
import { RootModule } from '~/root/root.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [RootModule, AuthModule],
  providers: []
})
export class AppModule {}
