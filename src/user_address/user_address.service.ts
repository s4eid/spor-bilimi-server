import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserAddressInput } from './dto/create-user_address.input';
import { UpdateUserAddressInput } from './dto/update-user_address.input';

@Injectable()
export class UserAddressService {
  constructor(private prisma: PrismaService) {}
  async create(createUserAddressInput: CreateUserAddressInput) {
    const userAddress = await this.prisma.user_address.create({
      data: {
        address: createUserAddressInput.address,
        city: createUserAddressInput.city,
        phone_number: createUserAddressInput.phone_number,
        user_id: createUserAddressInput.user_id,
        zip_code: createUserAddressInput.zip_code,
      },
    });
    return userAddress;
  }

  findAll() {
    return `This action returns all userAddress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAddress`;
  }

  async findOneWithUserId(id: string) {
    const user = await this.prisma.user_address.findUnique({
      where: { user_id: id },
    });
    return user;
  }
  update(id: number, updateUserAddressInput: UpdateUserAddressInput) {
    return `This action updates a #${id} userAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAddress`;
  }
}
