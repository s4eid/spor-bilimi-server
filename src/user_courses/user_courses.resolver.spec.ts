import { Test, TestingModule } from '@nestjs/testing';
import { UserCoursesResolver } from './user_courses.resolver';
import { UserCoursesService } from './user_courses.service';

describe('UserCoursesResolver', () => {
  let resolver: UserCoursesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCoursesResolver, UserCoursesService],
    }).compile();

    resolver = module.get<UserCoursesResolver>(UserCoursesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
