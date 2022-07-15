import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserCourseInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
