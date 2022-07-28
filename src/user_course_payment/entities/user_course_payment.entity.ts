import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class UserCoursePayment {
  @Field()
  user_course_payment_id: string;
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
