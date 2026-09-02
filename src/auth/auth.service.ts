import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'passwordHash'> | null> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash: _, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: 'admin',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
