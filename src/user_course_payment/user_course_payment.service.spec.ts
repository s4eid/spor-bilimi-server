import { Test, TestingModule } from '@nestjs/testing';
import { UserCoursePaymentService } from './user_course_payment.service';

describe('UserCoursePaymentService', () => {
  let service: UserCoursePaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCoursePaymentService],
    }).compile();

    service = module.get<UserCoursePaymentService>(UserCoursePaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
