import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppLogger } from '~/app.logger';
import { JWT_SECRET } from '~/app.vars';
import { UsersModule } from '~/users/users.module';
import { UsersRepository } from '~/users/users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy, RefreshTokenStrategy } from './strategies';
import { LocalStrategy } from './strategies/local.strategy';

const dependencies = [
  AppLogger,
  AuthService,
  UsersRepository,
  LocalStrategy,
  RefreshTokenStrategy,
  JwtStrategy
];
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET
    })
  ],
  controllers: [AuthController],
  providers: dependencies,
  exports: dependencies
})
export class AuthModule {}
