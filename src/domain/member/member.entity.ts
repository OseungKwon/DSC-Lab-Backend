import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
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
import { ApiProperty } from '@nestjs/swagger';

@Entity('member')
export class MemberEntity {
  @PrimaryColumn()
  @ApiProperty()
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nickname: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
  })
  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty()
  role: Role;

  @Column({
    type: 'enum',
    enum: Sex,
    nullable: false,
  })
  @IsEnum(Sex)
  @IsNotEmpty()
  @ApiProperty()
  sex: Sex;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  birth: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @ApiProperty()
  phonenumber: string;

  @Column({
    type: 'enum',
    enum: Approved,
    nullable: false,
    default: Approved.PENDING,
  })
  @IsEnum(Approved)
  @IsNotEmpty()
  @ApiProperty()
  approved: Approved;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  emailConfirmed: boolean;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => BoardEntity, (board) => board.writer, {
    cascade: ['insert', 'update', 'remove'],
  })
  @ApiProperty()
  boards: Relation<BoardEntity[]>;

  @OneToMany(() => CommentEntity, (comment) => comment.writer)
  @ApiProperty()
  comments: Relation<CommentEntity[]>;

  constructor(data: Partial<MemberEntity>) {
    Object.assign(this, data);
  }
}
