import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserMemberInterface } from './member.interface';
import { PrismaService } from '@app/prisma/prisma.service';
import { EditProfileDto } from '@app/members/users/dto/edit-profile.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { hashCount } from '@app/authentication/common';
import { WithdrawServiceDTO } from './dto/withdraw-service.dto';

@Injectable()
export class UserMemberService implements UserMemberInterface {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(uid: string) {
    const result = await this.prisma.user.findUnique({
      where: {
        id: uid,
      },
    });
    // Delete user hash
    delete result.password;
    return result;
  }
  async editProfile(uid: User, dto: EditProfileDto) {
    // Check password
    const passwordValidation = await bcrypt.compare(dto.password, uid.password);

    if (!passwordValidation) {
      throw new UnauthorizedException('Wrong password');
    }

    // Change credential
    try {
      const [updatedResult] = await this.prisma.$transaction([
        this.prisma.user.update({
          where: {
            id: uid.id,
          },
          data: dto.changedPassword
            ? {
                name: dto.name,
                nickname: dto.nickname,
                password: await bcrypt.hash(dto.changedPassword, hashCount),
              }
            : {
                name: dto.name,
                nickname: dto.nickname,
              },
        }),
      ]);
      // Delete user hash
      delete updatedResult.password;
      return updatedResult;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new BadRequestException('Credential already taken');
        }
        throw err;
      }
    }
  }

  async serviceWithdraw(uid: User, dto: WithdrawServiceDTO) {
    const passwordValidation = await bcrypt.compare(dto.password, uid.password);
    if (!passwordValidation) {
      throw new UnauthorizedException('Wrong password');
    }
    try {
      const [deleteResult] = await this.prisma.$transaction([
        this.prisma.user.delete({
          where: {
            id: uid.id,
          },
        }),
      ]);
      delete deleteResult.password;
      return deleteResult;
    } catch (err) {
      throw new InternalServerErrorException('Fail withdraw');
    }
  }
}
