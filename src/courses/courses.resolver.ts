import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { PlansService } from 'src/plans/plans.service';
import { TrainersService } from 'src/trainers/trainers.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private readonly coursesService: CoursesService,
    private plansService: PlansService,
    private trainerService: TrainersService,
  ) {}

  @Mutation(() => Course)
  createCourse(
    @Args('createCourseInput') createCourseInput: CreateCourseInput,
  ) {
    return this.coursesService.create(createCourseInput);
  }

  @Query(() => [Course], { name: 'courses' })
  // @UseGuards(AuthGuard)
  findAll() {
    return this.coursesService.findAll();
  }
  @ResolveField()
  async plans(@Parent() plan: Course) {
    const { course_id } = plan;
    return this.plansService.findAllPlanCourses(course_id);
  }
  @ResolveField()
  async trainer(@Parent() plan: Course) {
    const { trainer_id } = plan;
    return this.trainerService.findOne(trainer_id);
  }

  @Query(() => Course, { name: 'course' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.coursesService.findOne(id);
  }

  @Mutation(() => Course)
  updateCourse(
    @Args('updateCourseInput') updateCourseInput: UpdateCourseInput,
  ) {
    return this.coursesService.update(updateCourseInput.id, updateCourseInput);
  }

  @Mutation(() => Course)
  removeCourse(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.remove(id);
  }
}
