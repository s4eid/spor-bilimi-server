import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersResolver } from './trainers.resolver';
import { PrismaService } from '../../prisma/prisma.service';
import { CoursesService } from 'src/courses/courses.service';

@Module({
  providers: [PrismaService, TrainersResolver, TrainersService, CoursesService],
  exports: [TrainersService],
})
export class TrainersModule {}
