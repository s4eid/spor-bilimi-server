import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}
  create(createCourseInput: CreateCourseInput) {
    const course = this.prisma.courses.create({ data: createCourseInput });
    return course;
  }

  findAll() {
    const courses = this.prisma.courses.findMany();
    return courses;
  }

  findAllTrainerCourses(trainer_id: string) {
    const courses = this.prisma.courses.findMany({
      where: { trainer_id: trainer_id },
    });
    return courses;
  }

  async findOne(id: string) {
    const course = await this.prisma.courses.findUnique({
      where: {
        course_id: id,
      },
    });
    return course;
  }

  update(id: number, updateCourseInput: UpdateCourseInput) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
