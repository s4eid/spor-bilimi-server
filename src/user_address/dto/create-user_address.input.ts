import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserAddressInput {
  @Field()
  address: string;
  @Field()
  city: string;
  @Field()
  zip_code: string;
  @Field()
  phone_number: string;
  @Field()
  user_id: string;
}
