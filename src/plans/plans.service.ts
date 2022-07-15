import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePlanInput } from './dto/create-plan.input';
import { UpdatePlanInput } from './dto/update-plan.input';

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}
  async create(createPlanInput: CreatePlanInput) {
    const plan = await this.prisma.plans.create({
      data: {
        price: createPlanInput.price,
        course_id: createPlanInput.course_id,
        time: createPlanInput.time,
      },
    });
    return plan;
  }

  findAll() {
    const plans = this.prisma.plans.findMany();
    return plans;
  }

  findAllPlanCourses(course_id: string) {
    const plans = this.prisma.plans.findMany({
      where: { course_id: course_id },
    });
    return plans;
  }

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  update(id: number, updatePlanInput: UpdatePlanInput) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
