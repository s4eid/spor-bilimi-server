import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
    PrismaService,
  ],
  imports: [
    UsersModule,
    PassportModule,
    HttpModule,
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
      secret: 'saeid',
    }),
  ],
})
export class AuthModule {}
