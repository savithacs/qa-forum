import { AnswerResponseDto } from './answer-response.dto';
import { Question } from '../entities/questions.entity';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class QuestionResponseDto {
  id: string;

  title: string;

  description: string;

  questionBy: UserResponseDto;

  createdAt: Date;

  answers: AnswerResponseDto[];

  static fromEntity(question: Question): QuestionResponseDto {
    const dto = new QuestionResponseDto();
    dto.id = question.id;
    dto.title = question.title;
    dto.description = question.description;
    dto.createdAt = question.createdAt;
    // The relation is loaded on some code paths and not on others, so read the
    // id defensively rather than assuming `offer.auction` is there.
    dto.questionBy = question.owner
      ? UserResponseDto.fromEntity(question.owner)
      : undefined;
    if (question.answers)
      dto.answers = question.answers
        ? question.answers.map((answer) => AnswerResponseDto.fromEntity(answer))
        : [];
    return dto;
  }
}
