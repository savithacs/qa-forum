import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  findAllQuestions() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findQuestionById(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionsService.findById(id);
  }
}
