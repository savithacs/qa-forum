import { Answer } from '../entities/answers.entity';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class AnswerResponseDto {
  id: string;

  content: string;

  answerBy: UserResponseDto;

  createdAt: Date;

  static fromEntity(answer: Answer): AnswerResponseDto {
    const dto = new AnswerResponseDto();
    dto.id = answer.id;
    dto.content = answer.content;
    dto.createdAt = answer.createdAt;
    // The relation is loaded on some code paths and not on others, so read the
    // id defensively rather than assuming `offer.auction` is there.
    dto.answerBy = answer.owner
      ? UserResponseDto.fromEntity(answer.owner)
      : undefined;

    return dto;
  }
}
