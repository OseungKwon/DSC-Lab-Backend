import { MemberEntity } from '@domain/member/member.entity';
import { CheckType } from '@domain/member/member.enum';
import {
  EmailUnavailable,
  MemberNotFound,
  NicknameUnavailable,
  UnsupportedValidationType,
} from '@infrastructure/exception/member';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  EntityManager,
  QueryFailedError,
  Repository,
} from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { v4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PasswordUnmatched } from '@infrastructure/exception/authentication';
import { WithdrawMemberDto } from './dto/withdraw-member.dto';

@Injectable()
export class MemberService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
  ) {}

  /**
   * Encrpyt password, BCRYPT_COUNTER in dev.env
   *
   * @param password
   * @returns
   */
  public static async passwordEncrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, +process.env.BCRYPT_COUNTER);
  }

  /**
   * Compare between hashed password and plain password
   *
   * @param password
   * @param hashedPassword
   * @returns
   */
  public static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public async getAll(page: number, size: number): Promise<MemberEntity[]> {
    return await this.memberRepository.find({
      skip: page,
      take: size,
      relations: {
        boards: true,
        comments: true,
      },
    });
  }

  public async getById(id: string): Promise<MemberEntity> {
    const result = await this.memberRepository.findOne({
      where: {
        id,
      },
      relations: {
        boards: true,
        comments: true,
      },
    });
    if (!result) {
      throw new MemberNotFound();
    }
    return result;
  }

  public async isAvailableValue(tp: CheckType, val: string): Promise<boolean> {
    let findMember: MemberEntity;
    switch (tp) {
      case CheckType.EMAIL:
        findMember = await this.memberRepository.findOne({
          where: {
            email: val,
          },
        });
        break;
      case CheckType.NICKNAME:
        findMember = await this.memberRepository.findOne({
          where: {
            nickname: val,
          },
        });
        break;
      default:
        throw new UnsupportedValidationType();
    }
    return !findMember ? true : false;
  }

  public async createMember(dto: CreateMemberDto): Promise<MemberEntity> {
    console.log('Here');
    // Generate new UUID
    const newId = v4();

    // Check unique values

    if (!(await this.isAvailableValue(CheckType.EMAIL, dto.email))) {
      throw new EmailUnavailable();
    }
    if (!(await this.isAvailableValue(CheckType.NICKNAME, dto.nickname))) {
      throw new NicknameUnavailable();
    }

    // Hash plain password
    dto.password = await MemberService.passwordEncrypt(dto.password);

    //Transacrtion
    const newMember = await this.dataSource.transaction(
      async (manager: EntityManager) => {
        const repository = manager.getRepository<MemberEntity>(MemberEntity);
        /**
         * emailConfirmed is set as false in default
         *
         * approved is set as pending in default
         */
        const member = new MemberEntity({
          ...dto,
        });
        member.id = newId;
        const result = await repository.save(member);
        return result;
      },
    );

    return newMember;
  }

  public async updateMember(dto: UpdateMemberDto): Promise<MemberEntity> {
    // Update Member

    // Transaction
    const updatedMember = await this.dataSource.transaction(
      async (manager: EntityManager) => {
        const repository = manager.getRepository(MemberEntity);
        const targetMember = await repository.findOne({
          where: {
            id: dto.id,
          },
        });

        if (!targetMember) {
          throw new MemberNotFound();
        }

        // Get password compare
        const pwCompare = await MemberService.comparePassword(
          dto.password,
          targetMember.password,
        );
        if (!pwCompare) {
          throw new PasswordUnmatched();
        }

        // If user wants to update nickname, check if nickname already in used
        if (dto?.nickname) {
          const checkAvailable = await this.isAvailableValue(
            CheckType.NICKNAME,
            dto.nickname,
          );
          if (!checkAvailable) {
            throw new NicknameUnavailable();
          }
          targetMember.nickname = dto.nickname;
        }

        // Update phone number
        if (dto?.phonenumber) {
          targetMember.phonenumber = dto.phonenumber;
        }

        // Update password if user want to change
        if (dto?.changedPassword) {
          targetMember.password = await MemberService.passwordEncrypt(
            dto.changedPassword,
          );
        }

        return await repository.save(targetMember);
      },
    );
    return updatedMember;
  }

  public async withdrawMember(dto: WithdrawMemberDto): Promise<boolean> {
    const result = await this.dataSource.transaction(
      async (manager: EntityManager) => {
        const repository = manager.getRepository(MemberEntity);
        const targetMember = await repository.findOne({
          where: {
            id: dto.id,
          },
        });
        if (!targetMember) {
          throw new MemberNotFound();
        }
        // Compare password
        if (
          !(await MemberService.comparePassword(
            dto.password,
            targetMember.password,
          ))
        ) {
          throw new PasswordUnmatched();
        }

        return await repository.remove(targetMember);
      },
    );
    return true;
  }
}
