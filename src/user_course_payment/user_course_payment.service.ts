import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserCoursePaymentInput } from './dto/create-user_course_payment.input';
import { UpdateUserCoursePaymentInput } from './dto/update-user_course_payment.input';

@Injectable()
export class UserCoursePaymentService {
  constructor(private prisma: PrismaService) {}
  async create(createUserCoursePaymentInput: CreateUserCoursePaymentInput) {
    const payment = await this.prisma.user_course_payment.create({
      data: {
        user_course_id: createUserCoursePaymentInput.user_couse_id,
        iyzico_payment_id: createUserCoursePaymentInput.iyzico_payment_id,
        price: createUserCoursePaymentInput.price,
        paid_price: createUserCoursePaymentInput.paid_price,
        iyzico_commission_fee:
          createUserCoursePaymentInput.iyzico_commission_fee,
      },
    });
    return payment;
  }

  findAll() {
    return `This action returns all userCoursePayment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCoursePayment`;
  }

  update(
    id: number,
    updateUserCoursePaymentInput: UpdateUserCoursePaymentInput,
  ) {
    return `This action updates a #${id} userCoursePayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCoursePayment`;
  }
}
