import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesResolver } from './courses.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { PlansService } from 'src/plans/plans.service';
import { TrainersService } from 'src/trainers/trainers.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [
    PrismaService,
    CoursesResolver,
    CoursesService,
    PlansService,
    TrainersService,
  ],
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
      secret: 'saeid',
    }),
  ],
  exports: [CoursesService],
})
export class CoursesModule {}
