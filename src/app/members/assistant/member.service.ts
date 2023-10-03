import { AssistantMemberInterface } from '@app/members/assistant/member.interface';
import { ChangeUserStatusDto } from '@app/members/assistant/dto/change-user-status.dto';
import { Assistant, Status } from '@prisma/client';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { EditAssistantDto } from '@app/members/assistant/dto/edit-assistant.dto';
import * as bcrypt from 'bcryptjs';
import { hashCount } from '@app/authentication/common';
import { PaginationCounter } from '@infrastructure/util';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AssistantMemberService implements AssistantMemberInterface {
  constructor(private readonly prisma: PrismaService) {}
  async getProfile(aid: string) {
    const result = await this.prisma.assistant.findUnique({
      where: {
        id: aid,
      },
    });
    delete result.password;
    return result;
  }
  async editProfile(assistant: Assistant, dto: EditAssistantDto) {
    const passwordValidation = await bcrypt.compare(
      dto.password,
      assistant.password,
    );

    if (!passwordValidation) {
      throw new UnauthorizedException('Wrong password');
    }
    const [updatedAssistant] = await this.prisma.$transaction([
      this.prisma.assistant.update({
        where: {
          id: assistant.id,
        },
        data: dto.changedPassword
          ? {
              name: dto.name,
              password: await bcrypt.hash(dto.changedPassword, hashCount),
            }
          : {
              name: dto.name,
            },
      }),
    ]);
    delete updatedAssistant.password;
    return updatedAssistant;
  }

  async getUserList(status: Status, page: number, size: number) {
    const [skip, take] = PaginationCounter(page, size);
    const users = await this.prisma.user.findMany({
      skip,
      take,
      where: status
        ? {
            status,
          }
        : {},
    });

    if (!users.length) {
      throw new BadRequestException('User not found on this page');
    }
    /** Delete user field */
    users.forEach((user) => {
      delete user.password;
    });

    return users;
  }

  async getUserInfo(uid: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: uid,
        },
      });
      delete user.password;
      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('User not found');
      }
      throw err;
    }
  }

  async changeUserStatus(uid: string, dto: ChangeUserStatusDto) {
    try {
      await this.prisma.user.findUniqueOrThrow({
        where: {
          id: uid,
        },
      });
      const [updatedResult] = await this.prisma.$transaction([
        this.prisma.user.update({
          where: {
            id: uid,
          },
          data: {
            status: dto.status,
          },
        }),
      ]);
      return updatedResult;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('User not found');
      }
      throw err;
    }
  }
}
