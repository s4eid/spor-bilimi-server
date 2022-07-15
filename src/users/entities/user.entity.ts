import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserCourse } from 'src/user_courses/entities/user_course.entity';

@ObjectType()
export class User {
  @Field()
  user_id: string;
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  password?: string;
  @Field(() => [UserCourse], { nullable: true })
  user_courses?: UserCourse[];
  @Field()
  createdAt: string;
  @Field({ nullable: true })
  hashedRt?: string;
}
