import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from '~/app.vars';
import { PrismaService } from '~/common/prisma';
import { UsersRepository } from '~/users/users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy, RefreshTokenStrategy } from './strategies';
import { LocalStrategy } from './strategies/local.strategy';

const dependencies = [
  AuthService,
  UsersRepository,
  PrismaService,
  LocalStrategy,
  RefreshTokenStrategy,
  JwtStrategy
];
@Module({
  imports: [
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
