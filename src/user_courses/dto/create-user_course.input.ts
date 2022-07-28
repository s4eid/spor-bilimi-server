import { InputType, Int, Field } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@InputType()
export class CreateUserCourseInput {
  @Field()
  user_id: string;
  @Field()
  course_id: string;
  @Field()
  plan_id: string;
  @Field({ nullable: true })
  time?: string;
  @Field(() => JSON, { nullable: true })
  quiz?: any;
  @Field()
  address: string;
  @Field()
  city: string;
  @Field()
  phone_number: string;
  @Field()
  zip_code: string;
  @Field()
  card_number: string;
  @Field()
  owner: string;
  @Field()
  cvv: string;
  @Field()
  expire_y: string;
  @Field()
  expire_m: string;
  @Field(() => Boolean)
  threeD: boolean;
}
