import { MemberEntity } from '@domain/member/member.entity';
import { MemberNotFound, TestExcept } from '@infrastructure/exception/member';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
  ) {}

  public async getAll(page: number, size: number): Promise<MemberEntity[]> {
    return await this.memberRepository.find({
      skip: page,
      take: size,
    });
  }

  public async getById(id: string): Promise<MemberEntity> {
    const result = await this.memberRepository.findOne({
      where: {
        id,
      },
    });
    if (!result) {
      throw new QueryFailedError('a', [], []);
    }
    return result;
  }
}
