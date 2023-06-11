import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CacheService } from '~/config';
import { EstablishmentsModule } from '~/establishments/establishments.module';
import { RootModule } from '~/root/root.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './common/guards';
import { ScheduleModule } from './schedule/schedule.module';
import { ServicesModule } from './services/services.module';
import { TelephonesModule } from './telephones/telephones.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheService
    }),
    AuthModule,
    UsersModule,
    TelephonesModule,
    RootModule,
    ScheduleModule,
    EstablishmentsModule,
    ServicesModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
