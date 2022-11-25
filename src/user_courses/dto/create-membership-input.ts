import { InputType, Field } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@InputType()
export class CreateMembershipInput {
  @Field(() => JSON, { nullable: true })
  quiz?: any;
  @Field({ nullable: true })
  time?: string;
}
