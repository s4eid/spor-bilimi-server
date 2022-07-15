import { Injectable } from '@nestjs/common';
import { CreateUserCourseInput } from './dto/create-user_course.input';
import { UpdateUserCourseInput } from './dto/update-user_course.input';

@Injectable()
export class UserCoursesService {
  create(createUserCourseInput: CreateUserCourseInput) {
    return 'This action adds a new userCourse';
  }

  findAll() {
    return `This action returns all userCourses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCourse`;
  }

  update(id: number, updateUserCourseInput: UpdateUserCourseInput) {
    return `This action updates a #${id} userCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCourse`;
  }
}
