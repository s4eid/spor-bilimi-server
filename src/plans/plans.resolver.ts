import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PlansService } from './plans.service';
import { Plan } from './entities/plan.entity';
import { CreatePlanInput } from './dto/create-plan.input';
import { UpdatePlanInput } from './dto/update-plan.input';
import { CoursesService } from 'src/courses/courses.service';

@Resolver(() => Plan)
export class PlansResolver {
  constructor(
    private readonly plansService: PlansService,
    private courseService: CoursesService,
  ) {}

  @Mutation(() => Plan)
  createPlan(@Args('createPlanInput') createPlanInput: CreatePlanInput) {
    return this.plansService.create(createPlanInput);
  }

  @Query(() => [Plan], { name: 'plans' })
  findAll() {
    return this.plansService.findAll();
  }

  @Query(() => Plan, { name: 'plan' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.plansService.findOne(id);
  }
  @ResolveField()
  async course(@Parent() course: Plan) {
    const { course_id } = course;
    return this.courseService.findOne(course_id);
  }

  @Mutation(() => Plan)
  updatePlan(@Args('updatePlanInput') updatePlanInput: UpdatePlanInput) {
    return this.plansService.update(updatePlanInput.id, updatePlanInput);
  }

  @Mutation(() => Plan)
  removePlan(@Args('id', { type: () => Int }) id: number) {
    return this.plansService.remove(id);
  }
}
