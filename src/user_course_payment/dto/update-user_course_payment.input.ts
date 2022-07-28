import { CreateUserCoursePaymentInput } from './create-user_course_payment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserCoursePaymentInput extends PartialType(CreateUserCoursePaymentInput) {
  @Field(() => Int)
  id: number;
}
