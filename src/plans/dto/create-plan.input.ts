import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Course } from '../../courses/entities/course.entity';

@InputType()
export class CreatePlanInput {
  @Field(() => Float)
  price: number;
  @Field()
  time: string;
  @Field()
  course_id: string;
}
