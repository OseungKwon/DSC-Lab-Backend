import { hashCount } from '@app/authentication/common';
import { EditProfileDto } from '@app/members/users/dto/edit-profile.dto';
import { PrismaService } from '@app/prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcryptjs';
import { WithdrawServiceDTO } from './dto/withdraw-service.dto';
import { UserMemberInterface } from './member.interface';
import { userProfileDirectory } from '@infrastructure/util';
import { AwsS3Service } from '@s3/aws-s3';

@Injectable()
export class UserMemberService implements UserMemberInterface {
  private profileURLProperty = 'profileURL';

  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: AwsS3Service,
  ) {}

  async getProfile(uid: string) {
    const result = await this.prisma.user.findUnique({
      where: {
        id: uid,
      },
    });

    /** Issue presigned URL */
    result[this.profileURLProperty] = await this.s3.getSignedURL(
      result.profileImageKey,
      userProfileDirectory,
    );

    // Delete user hash
    delete result.password;
    return result;
  }

  async editProfile(
    user: User,
    dto: EditProfileDto,
    file?: Express.Multer.File,
  ) {
    // Check password
    const passwordValidation = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!passwordValidation) {
      throw new UnauthorizedException('Wrong password');
    }

    /** Upload file */
    let userFileKey = user.profileImageKey;
    if (file) {
      /** Remove previous object. Do not wait this task */
      this.s3.removeObject(userFileKey, userProfileDirectory);
      /** Upload new profile image */
      userFileKey = await this.s3.uploadFile(file, userProfileDirectory);
    }

    // Change credential
    try {
      const [updatedResult] = await this.prisma.$transaction([
        this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: dto.changedPassword
            ? {
                name: dto.name,
                nickname: dto.nickname,
                password: await bcrypt.hash(dto.changedPassword, hashCount),
                profileImageKey: userFileKey,
              }
            : {
                name: dto.name,
                nickname: dto.nickname,
                profileImageKey: userFileKey,
              },
        }),
      ]);

      /** Issue presigned URL */
      updatedResult[this.profileURLProperty] = await this.s3.getSignedURL(
        updatedResult.profileImageKey,
        userProfileDirectory,
      );
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
