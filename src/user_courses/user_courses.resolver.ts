import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserCoursesService } from './user_courses.service';
import { Status, UserCourse } from './entities/user_course.entity';
import { CreateUserCourseInput } from './dto/create-user_course.input';
import { UpdateUserCourseInput } from './dto/update-user_course.input';
import { CreateMembershipInput } from './dto/create-membership-input';

@Resolver(() => UserCourse)
export class UserCoursesResolver {
  constructor(private readonly userCoursesService: UserCoursesService) {}

  @Mutation(() => Status)
  createUserCourse(
    @Args('createUserCourseInput') createUserCourseInput: CreateUserCourseInput,
  ) {
    return this.userCoursesService.create(createUserCourseInput);
  }
  @Mutation(() => Status)
  createMembership(
    @Args('createMembership') createMembershipInput: CreateMembershipInput,
  ) {
    return this.userCoursesService.createMembership(createMembershipInput);
  }

  @Query(() => [UserCourse], { name: 'userCourses' })
  findAll() {
    return this.userCoursesService.findAll();
  }

  @Query(() => UserCourse, { name: 'userCourse' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userCoursesService.findOne(id);
  }

  @Mutation(() => UserCourse)
  updateUserCourse(
    @Args('updateUserCourseInput') updateUserCourseInput: UpdateUserCourseInput,
  ) {
    return this.userCoursesService.update(
      updateUserCourseInput.id,
      updateUserCourseInput,
    );
  }

  @Mutation(() => UserCourse)
  removeUserCourse(@Args('id', { type: () => Int }) id: number) {
    return this.userCoursesService.remove(id);
  }
}
