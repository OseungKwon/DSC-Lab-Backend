import { BoardEntity } from '@domain/board/board.entity';
import { MemberEntity } from '@domain/member/member.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BoardEntity, (board) => board.comments)
  boardId: Relation<BoardEntity>;

  @ManyToOne(() => MemberEntity, (member) => member.comments)
  writer: Relation<MemberEntity>;

  @OneToMany(() => CommentEntity, (comment) => comment.child)
  parent: Relation<CommentEntity>;

  @ManyToOne(() => CommentEntity, (comment) => comment.parent)
  child: Relation<CommentEntity[]>;

  @Column({
    type: 'text',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(data: CommentEntity) {
    Object.assign(this, data);
  }
}
