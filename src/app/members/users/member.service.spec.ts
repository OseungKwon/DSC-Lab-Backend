import { UserMemberService } from '@app/members/users/member.service';
import { PrismaService } from '@app/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '@app/prisma/prisma.module';
import { generateRandomMember } from '../../../../test/payload.test';
import { User } from '@prisma/client';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AwsS3Module } from '@s3/aws-s3';
import { ConfigModule } from '@nestjs/config';

describe('UserMemberService', () => {
  let service: UserMemberService;
  let prisma: PrismaService;

  const [user1Signup, user1Signin, user1Edit] = generateRandomMember(true);
  let user1: User;
  const [user2Signup, user2Signin, user2Edit] = generateRandomMember(true);
  let user2: User;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, AwsS3Module],
      providers: [UserMemberService],
    }).compile();
    service = module.get<UserMemberService>(UserMemberService);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.deleteAll();
    // Generate test datas
    user1 = await prisma.user.create({
      data: {
        ...user1Signup,
      },
    });
    user2 = await prisma.user.create({
      data: {
        ...user2Signup,
      },
    });
  });

  describe('Get Profile (GET)', () => {
    it('should give user profile information', async () => {
      const result = await service.getProfile(user1.id);
      expect(result).not.toBeUndefined();
      expect(result.password).toBeUndefined();
    });
  });

  describe('Edit profile (PATCH)', () => {
    it('should throw if password unmatched', async () => {
      try {
        const fakeEditDto = {
          ...user1Edit,
        };
        fakeEditDto.password = 'wrong password';
        await service.editProfile(user1, fakeEditDto);
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should throw if credential taken(prisma error)', async () => {
      try {
        const fakeEditDto = {
          ...user1Edit,
        };
        fakeEditDto.nickname = user2Signup.nickname;
        await service.editProfile(user1, fakeEditDto);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should edit data', async () => {
      const result = await service.editProfile(user1, user1Edit);
      expect(result.id).toBe(user1.id);
      expect(result.password).toBeUndefined();
    });
  });
});
