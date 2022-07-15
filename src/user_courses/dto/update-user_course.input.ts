import { CreateUserCourseInput } from './create-user_course.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserCourseInput extends PartialType(CreateUserCourseInput) {
  @Field(() => Int)
  id: number;
}
