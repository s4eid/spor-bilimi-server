import { Module } from '@nestjs/common';
import { UserCoursePaymentService } from './user_course_payment.service';
import { UserCoursePaymentResolver } from './user_course_payment.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    UserCoursePaymentResolver,
    UserCoursePaymentService,
    PrismaService,
  ],
  exports: [UserCoursePaymentService],
})
export class UserCoursePaymentModule {}
