import { Answer } from 'src/questions/entities/answers.entity';
import { Question } from 'src/questions/entities/questions.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  email: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => Question, (question) => question.owner)
  questions: Question[];

  @OneToMany(() => Answer, (answer) => answer.owner)
  answers: Answer[];
}
