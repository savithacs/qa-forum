import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/questions.entity';
import { Repository } from 'typeorm';
import { Answer } from './entities/answers.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questions: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answers: Repository<Answer>,
  ) {}

  findAll() {
    return this.questions.find();
  }

  async findById(id: string) {
    const question = await this.questions.findOne({
      where: { id },
      relations: {
        owner: true,
      },
    });
    if (!question) throw new NotFoundException();
    return question;
  }
}
