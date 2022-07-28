import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { UserAddressService } from 'src/user_address/user_address.service';

@Module({
  providers: [PrismaService, UsersResolver, UsersService, UserAddressService],
  exports: [UsersService],
})
export class UsersModule {}
