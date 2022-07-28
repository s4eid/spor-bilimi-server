import { Test, TestingModule } from '@nestjs/testing';
import { UserCoursePaymentResolver } from './user_course_payment.resolver';
import { UserCoursePaymentService } from './user_course_payment.service';

describe('UserCoursePaymentResolver', () => {
  let resolver: UserCoursePaymentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCoursePaymentResolver, UserCoursePaymentService],
    }).compile();

    resolver = module.get<UserCoursePaymentResolver>(UserCoursePaymentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
