import { CreateUserAddressInput } from './create-user_address.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserAddressInput extends PartialType(CreateUserAddressInput) {
  @Field(() => Int)
  id: number;
}
