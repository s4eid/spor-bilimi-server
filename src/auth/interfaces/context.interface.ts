import { GraphQLExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/interfaces/user.interface';

export interface ContextWithUser {
  GraphQLExecutionContext;
  user?: User;
}
