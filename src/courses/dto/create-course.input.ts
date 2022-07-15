import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
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
  @Field()
  image: string;
  @Field()
  trainer_id: string;
}
