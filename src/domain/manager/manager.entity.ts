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
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Position } from './manager.enum';
import { Sex } from '@domain/common.enum';

@Entity('manager')
export class ManagerEntity {
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
    nullable: false,
    enum: Position,
  })
  @IsEnum(Position)
  @IsNotEmpty()
  position: Position;

  @Column({
    type: 'enum',
    nullable: false,
    enum: Sex,
  })
  @IsEnum(Sex)
  @IsNotEmpty()
  sex: Sex;

  @Column({
    type: 'bool',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  activated: boolean;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  @IsDateString()
  @IsNotEmpty()
  availableDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
