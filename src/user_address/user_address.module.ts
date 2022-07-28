import { Module } from '@nestjs/common';
import { UserAddressService } from './user_address.service';
import { UserAddressResolver } from './user_address.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [UserAddressResolver, UserAddressService, PrismaService],
  exports: [UserAddressService],
})
export class UserAddressModule {}
