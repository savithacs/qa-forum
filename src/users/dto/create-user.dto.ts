import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  password: string;
}
