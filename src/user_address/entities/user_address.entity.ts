import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class UserAddress {
  @Field()
  user_address_id: string;
  @Field()
  address: string;
  @Field()
  city: string;
  @Field()
  zip_code: string;
  @Field()
  phone_number: string;
  @Field(() => User)
  user: User;
}
