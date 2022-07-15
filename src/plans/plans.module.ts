import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansResolver } from './plans.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { CoursesService } from 'src/courses/courses.service';

@Module({
  providers: [PrismaService, PlansResolver, PlansService, CoursesService],
  // imports: [],
  exports: [PlansService],
})
export class PlansModule {}
