import { Injectable } from '@nestjs/common';
import { CreateTrainerInput } from './dto/create-trainer.input';
import { UpdateTrainerInput } from './dto/update-trainer.input';
import { PrismaService } from '../../prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class TrainersService {
  constructor(private prisma: PrismaService) {}

  async create(createTrainerInput: CreateTrainerInput) {
    const hashedPass = await hash(createTrainerInput.password, 10);
    const trainer = this.prisma.trainers.create({
      data: {
        first_name: createTrainerInput.first_name,
        last_name: createTrainerInput.last_name,
        email: createTrainerInput.email,
        image: createTrainerInput.image,
        password: hashedPass,
      },
    });
    return trainer;
  }

  findAll() {
    const trainers = this.prisma.trainers.findMany();
    return trainers;
  }

  findOne(id: string) {
    const trainer = this.prisma.trainers.findUnique({
      where: {
        trainer_id: id,
      },
    });
    return trainer;
  }

  update(id: number, updateTrainerInput: UpdateTrainerInput) {
    return `This action updates a #${id} trainer`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainer`;
  }
}
