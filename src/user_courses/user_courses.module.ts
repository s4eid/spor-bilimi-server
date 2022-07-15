import { Module } from '@nestjs/common';
import { UserCoursesService } from './user_courses.service';
import { UserCoursesResolver } from './user_courses.resolver';

@Module({
  providers: [UserCoursesResolver, UserCoursesService]
})
export class UserCoursesModule {}
