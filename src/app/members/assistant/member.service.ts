// Standard Packages
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

// Third-party Packages
import { Assistant, Status } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcryptjs';

// Custom Packages
import { hashCount } from '@app/authentication/common';
import { ChangeUserStatusDto } from '@app/members/assistant/dto/change-user-status.dto';
import { EditAssistantDto } from '@app/members/assistant/dto/edit-assistant.dto';
import { AssistantMemberInterface } from '@app/members/assistant/member.interface';
import { PrismaService } from '@app/prisma/prisma.service';
import {
  PaginationCounter,
  assistantProfileDirectory,
} from '@infrastructure/util';
import { AwsS3Service } from '@s3/aws-s3';
import { GetUserOverviewResponse } from './response';

@Injectable()
export class AssistantMemberService implements AssistantMemberInterface {
  private profileURLProperty = 'profileURL';
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: AwsS3Service,
  ) {}
  async getProfile(aid: number) {
    const result = await this.prisma.assistant.findUnique({
      where: {
        id: aid,
      },
    });
    /** Delet user password hash */
    delete result.password;
    return result;
  }

  async editProfile(
    assistant: Assistant,
    dto: EditAssistantDto,
    file?: Express.Multer.File,
  ) {
    /** Password validation */
    const passwordValidation = await bcrypt.compare(
      dto.password,
      assistant.password,
    );
    if (!passwordValidation) {
      throw new UnauthorizedException('Wrong password');
    }

    /** Upload file */
    let profileURL = assistant.profileURL;
    let imageKey = assistant.profileKey;
    if (file) {
      /** Remove previous image file */
      this.s3.removeObject(imageKey, assistantProfileDirectory);

      /** Upload new profile image */
      imageKey = await this.s3.uploadFile(file, assistantProfileDirectory);
      profileURL = this.s3.getStaticURL(imageKey, assistantProfileDirectory);
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
              profileURL: profileURL,
              profileKey: imageKey,
            }
          : {
              name: dto.name,
              profileKey: imageKey,
              profileURL: profileURL,
            },
      }),
    ]);

    /** Delete user password */
    delete updatedAssistant.password;
    return updatedAssistant;
  }

  async getUserListOverview() {
    const result: GetUserOverviewResponse = {
      total: 0,
      pending: 0,
      approved: 0,
      reject: 0,
    };

    const aggregation = await this.prisma.user.groupBy({
      by: ['status'],
      _count: {
        _all: true,
      },
    });

    aggregation.forEach((aggregate) => {
      const count = aggregate._count._all;
      result.total += count;
      switch (aggregate.status) {
        case 'Approved':
          result.approved += count;
          break;
        case 'Pending':
          result.pending += count;
          break;
        case 'Reject':
          result.reject += count;
          break;
      }
    });
    return result;
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

  async getUserInfo(uid: number) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: uid,
        },
      });

      /** Delete user password hash */
      delete user.password;
      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('User not found');
      }
      throw err;
    }
  }

  async changeUserStatus(uid: number, dto: ChangeUserStatusDto) {
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
