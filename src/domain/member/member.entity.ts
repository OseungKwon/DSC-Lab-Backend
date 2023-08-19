import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Approved, Role } from './member.enum';
import { Sex } from '@domain/common.enum';
import { BoardEntity } from '@domain/board/board.entity';
import { CommentEntity } from '@domain/comment/comment.entity';

@Entity('member')
export class MemberEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
  })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @Column({
    type: 'enum',
    enum: Sex,
    nullable: false,
  })
  @IsEnum(Sex)
  @IsNotEmpty()
  sex: Sex;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  @IsDateString()
  @IsNotEmpty()
  birth: Date;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  phonenumber: string;

  @Column({
    type: 'enum',
    enum: Approved,
    nullable: false,
  })
  @IsEnum(Approved)
  @IsNotEmpty()
  approved: Approved;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  emailConfirmed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BoardEntity, (board) => board.writer, {
    cascade: ['insert', 'update', 'remove'],
  })
  boards: Relation<BoardEntity[]>;

  @OneToMany(() => CommentEntity, (comment) => comment.writer)
  comments: Relation<CommentEntity[]>;

  constructor(data: MemberEntity) {
    Object.assign(this, data);
  }
}
