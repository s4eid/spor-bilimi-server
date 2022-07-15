import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Course } from '../../courses/entities/course.entity';

@ObjectType()
export class Plan {
  @Field()
  plan_id: string;
  @Field(() => Float)
  price: number;
  @Field()
  time: string;
  @Field(() => Course)
  course: Course;
  @Field()
  course_id: string;
  //   @Field()
  //   user_course:User
  @Field()
  createdAt: string;
}
