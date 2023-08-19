import { CommentEntity } from '@domain/comment/comment.entity';
import { MemberEntity } from '@domain/member/member.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

/**
 * 참고사항
 *
 * 1. id는 일반 generated column으로 처리한다
 *
 * 2. title의 최대 길이는 100입니다.
 *
 *
 * 4. 해시태그는 배열로 받아온 후 json 타입으로 컬럼에 저장합니다.
 *
 */

@Entity('board')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ManyToOne(() => MemberEntity, (member) => member.boards)
  writer: Relation<MemberEntity>;

  @Column({
    type: 'text',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  tags: string[];

  @OneToMany(() => CommentEntity, (comment) => comment.boardId, {
    cascade: ['insert', 'update', 'remove'],
  })
  comments: Relation<CommentEntity[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(data: BoardEntity) {
    Object.assign(this, data);
  }
}
