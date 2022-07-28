import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateUserCoursePaymentInput {
  @Field()
  user_couse_id: string;
  @Field()
  iyzico_payment_id: string;
  @Field(() => Float)
  paid_price: number;
  @Field(() => Float)
  price: number;
  @Field(() => Float)
  iyzico_commission_fee: number;
}
