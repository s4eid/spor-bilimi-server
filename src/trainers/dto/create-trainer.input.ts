import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTrainerInput {
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field()
  email: string;
  @Field()
  image: string;
  @Field()
  password: string;
}
