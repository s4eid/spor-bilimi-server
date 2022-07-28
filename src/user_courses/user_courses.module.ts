import { Module } from '@nestjs/common';
import { UserCoursesService } from './user_courses.service';
import { UserCoursesResolver } from './user_courses.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { UserAddressService } from 'src/user_address/user_address.service';
import { UserCoursePaymentService } from 'src/user_course_payment/user_course_payment.service';
import { CoursesService } from 'src/courses/courses.service';
import { PlansService } from 'src/plans/plans.service';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [
    UserCoursesResolver,
    UserCoursesService,
    PrismaService,
    UserAddressService,
    UserCoursePaymentService,
    UsersService,
    PlansService,
    CoursesService,
  ],
})
export class UserCoursesModule {}
