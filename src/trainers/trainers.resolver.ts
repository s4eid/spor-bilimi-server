import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TrainersService } from './trainers.service';
import { Trainer } from './entities/trainer.entity';
import { CreateTrainerInput } from './dto/create-trainer.input';
import { UpdateTrainerInput } from './dto/update-trainer.input';
import { CoursesService } from 'src/courses/courses.service';

@Resolver(() => Trainer)
export class TrainersResolver {
  constructor(
    private readonly trainersService: TrainersService,
    private courseService: CoursesService,
  ) {}

  @Mutation(() => Trainer)
  createTrainer(
    @Args('createTrainerInput') createTrainerInput: CreateTrainerInput,
  ) {
    return this.trainersService.create(createTrainerInput);
  }

  @Query(() => [Trainer], { name: 'trainers' })
  findAll() {
    return this.trainersService.findAll();
  }
  @ResolveField()
  courses(@Parent() trainer: Trainer) {
    const { trainer_id } = trainer;
    return this.courseService.findAllTrainerCourses(trainer_id);
  }
  @Query(() => Trainer, { name: 'trainer' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.trainersService.findOne(id);
  }
  @Mutation(() => Trainer)
  updateTrainer(
    @Args('updateTrainerInput') updateTrainerInput: UpdateTrainerInput,
  ) {
    return this.trainersService.update(
      updateTrainerInput.id,
      updateTrainerInput,
    );
  }

  @Mutation(() => Trainer)
  removeTrainer(@Args('id', { type: () => Int }) id: number) {
    return this.trainersService.remove(id);
  }
}
