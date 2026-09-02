import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.users.create({
      username: dto.username,
      email: dto.email,
      passwordHash,
    });
    try {
      return await this.users.save(user);
    } catch (error) {
      throw new ConflictException(error.detail);
    }
  }

  findByUsername(username: string): Promise<User | null> {
    return this.users.findOne({ where: { username } });
  }
}
