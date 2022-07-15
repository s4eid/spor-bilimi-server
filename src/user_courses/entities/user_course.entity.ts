import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import { Plan } from 'src/plans/entities/plan.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class UserCourse {
  @Field()
  user_course_id: string;
  @Field(() => User)
  user: User;
  @Field()
  user_id: string;
  @Field(() => Course)
  course: Course;
  @Field()
  course_id: string;
  @Field(() => Plan)
  plan: Plan;
  @Field()
  plan_id: string;
  @Field()
  createdAt: string;
}
