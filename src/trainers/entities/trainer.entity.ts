import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';

@ObjectType()
export class Trainer {
  @Field()
  trainer_id: string;
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field()
  email: string;
  @Field()
  image: string;
  @Field()
  createdAt: string;
  @Field(() => [Course], { nullable: true })
  courses?: Course[];
}
