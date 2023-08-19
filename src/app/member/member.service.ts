import { MemberEntity } from '@domain/member/member.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
  ) {}

  public getById(id: string) {}
}
