import { User } from '../entities/users.entity';

export class UserResponseDto {
  username: string;

  id: string;

  email: string;
  static fromEntity(user: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.email = user.email;
    dto.username = user.username;
    return dto;
  }
}
