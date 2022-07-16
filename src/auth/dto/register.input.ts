import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field()
  token: string;
}
