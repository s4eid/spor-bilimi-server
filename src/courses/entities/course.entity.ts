import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { Plan } from '../../plans/entities/plan.entity';

@ObjectType()
export class Course {
  @Field()
  course_id: string;
  @Field()
  name: string;
  @Field()
  title: string;
  @Field()
  category: string;
  @Field()
  details: string;
  @Field(() => [String])
  learn: string[];
  @Field(() => [Plan])
  plans: Plan[];
  @Field()
  image: string;
  @Field(() => Trainer)
  trainer: Trainer;
  @Field()
  trainer_id: string;
  @Field()
  createdAt: string;
  // user_course:
}
