import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login.response';
import { LoginInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { RegisterInput } from './dto/register.input';
import { ContextWithUser } from './interfaces/context.interface';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginInput') loginInput: LoginInput, @Context() context) {
    return this.authService.login(context, loginInput.token);
  }
  @Mutation(() => LoginResponse)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }
}
