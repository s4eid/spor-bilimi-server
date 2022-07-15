import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserCoursesService } from './user_courses.service';
import { UserCourse } from './entities/user_course.entity';
import { CreateUserCourseInput } from './dto/create-user_course.input';
import { UpdateUserCourseInput } from './dto/update-user_course.input';

@Resolver(() => UserCourse)
export class UserCoursesResolver {
  constructor(private readonly userCoursesService: UserCoursesService) {}

  @Mutation(() => UserCourse)
  createUserCourse(@Args('createUserCourseInput') createUserCourseInput: CreateUserCourseInput) {
    return this.userCoursesService.create(createUserCourseInput);
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
  updateUserCourse(@Args('updateUserCourseInput') updateUserCourseInput: UpdateUserCourseInput) {
    return this.userCoursesService.update(updateUserCourseInput.id, updateUserCourseInput);
  }

  @Mutation(() => UserCourse)
  removeUserCourse(@Args('id', { type: () => Int }) id: number) {
    return this.userCoursesService.remove(id);
  }
}
