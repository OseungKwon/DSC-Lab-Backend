import { Injectable } from '@nestjs/common';
import { UserMemberInterface } from './member.interface';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class UserMemberService implements UserMemberInterface {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(uid: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: uid,
      },
    });
  }
  editProfile(uid: string) {
    throw new Error('Method not implemented.');
  }
}
