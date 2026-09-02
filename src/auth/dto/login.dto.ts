import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  password: string;
}
