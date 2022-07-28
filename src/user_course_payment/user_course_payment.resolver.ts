import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserCoursePaymentService } from './user_course_payment.service';
import { UserCoursePayment } from './entities/user_course_payment.entity';
import { CreateUserCoursePaymentInput } from './dto/create-user_course_payment.input';
import { UpdateUserCoursePaymentInput } from './dto/update-user_course_payment.input';

@Resolver(() => UserCoursePayment)
export class UserCoursePaymentResolver {
  constructor(private readonly userCoursePaymentService: UserCoursePaymentService) {}

  @Mutation(() => UserCoursePayment)
  createUserCoursePayment(@Args('createUserCoursePaymentInput') createUserCoursePaymentInput: CreateUserCoursePaymentInput) {
    return this.userCoursePaymentService.create(createUserCoursePaymentInput);
  }

  @Query(() => [UserCoursePayment], { name: 'userCoursePayment' })
  findAll() {
    return this.userCoursePaymentService.findAll();
  }

  @Query(() => UserCoursePayment, { name: 'userCoursePayment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userCoursePaymentService.findOne(id);
  }

  @Mutation(() => UserCoursePayment)
  updateUserCoursePayment(@Args('updateUserCoursePaymentInput') updateUserCoursePaymentInput: UpdateUserCoursePaymentInput) {
    return this.userCoursePaymentService.update(updateUserCoursePaymentInput.id, updateUserCoursePaymentInput);
  }

  @Mutation(() => UserCoursePayment)
  removeUserCoursePayment(@Args('id', { type: () => Int }) id: number) {
    return this.userCoursePaymentService.remove(id);
  }
}
