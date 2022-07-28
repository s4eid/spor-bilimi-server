import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserAddressService } from './user_address.service';
import { UserAddress } from './entities/user_address.entity';
import { CreateUserAddressInput } from './dto/create-user_address.input';
import { UpdateUserAddressInput } from './dto/update-user_address.input';

@Resolver(() => UserAddress)
export class UserAddressResolver {
  constructor(private readonly userAddressService: UserAddressService) {}

  @Mutation(() => UserAddress)
  createUserAddress(
    @Args('createUserAddressInput')
    createUserAddressInput: CreateUserAddressInput,
  ) {
    return this.userAddressService.create(createUserAddressInput);
  }

  @Query(() => [UserAddress], { name: 'userAddress' })
  findAll() {
    return this.userAddressService.findAll();
  }

  @Query(() => UserAddress, { name: 'userAddress' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userAddressService.findOne(id);
  }
  @Query(() => UserAddress, { name: 'userAddress' })
  findOneWithUserId(@Args('id', { type: () => String }) id: string) {
    return this.userAddressService.findOneWithUserId(id);
  }

  @Mutation(() => UserAddress)
  updateUserAddress(
    @Args('updateUserAddressInput')
    updateUserAddressInput: UpdateUserAddressInput,
  ) {
    return this.userAddressService.update(
      updateUserAddressInput.id,
      updateUserAddressInput,
    );
  }

  @Mutation(() => UserAddress)
  removeUserAddress(@Args('id', { type: () => Int }) id: number) {
    return this.userAddressService.remove(id);
  }
}
