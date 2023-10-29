// Standard Packages
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

// Third-party Packages
import { Assistant, User } from '@prisma/client';

// Custom Packages
import { PrismaModule } from '@app/prisma/prisma.module';
import { PrismaService } from '@app/prisma/prisma.service';
import { AwsS3Module } from '@s3/aws-s3';
import {
  generateRandomAssistant,
  generateRandomMember,
} from 'test/payload.test';
import { AssistantMemberService } from './member.service';

describe('AssistantMemberService', () => {
  let service: AssistantMemberService;
  let prisma: PrismaService;

  /** Assistant1 -> Lab Assistant */
  const [assistant1Signup, assistant1Signin, assistant1Edit] =
    generateRandomAssistant(true);
  let assistant1: Assistant;

  const [assistant2Signup, assistant2Signin, assistant2Edit] =
    generateRandomAssistant(true);
  let assistant2: Assistant;

  const [user1Signup, user1Signin, user1Edit] = generateRandomMember(true);
  let user1: User;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule.forRoot({}), AwsS3Module],
      providers: [AssistantMemberService],
    }).compile();
    service = module.get<AssistantMemberService>(AssistantMemberService);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.deleteAll();

    // Generate test datas
    user1 = await prisma.user.create({
      data: {
        ...user1Signup,
      },
    });
    assistant1 = await prisma.assistant.create({
      data: {
        ...assistant1Signup,
      },
    });
    assistant2 = await prisma.assistant.create({
      data: {
        ...assistant2Signup,
      },
    });
  });

  afterAll(async () => {
    await prisma.deleteAll();
  });

  describe('Get profile (GET)', () => {
    it('should give user profile information', async () => {
      const result = await service.getProfile(assistant1.id);
      expect(result).not.toBeUndefined();
      expect(result.password).toBeUndefined();
    });
  });

  describe('Edit profile (PATCH)', () => {
    it('should throw if password unmatched', async () => {
      try {
        const fakeEditDto = {
          ...assistant1Edit,
        };
        fakeEditDto.password = 'wrong password';
        await service.editProfile(assistant1, fakeEditDto);
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should edit data', async () => {
      const result = await service.editProfile(assistant1, assistant1Edit);
      expect(result.id).toBe(assistant1.id);
      expect(result.password).toBeUndefined();
    });

    it("should edit even if user don't want to change password", async () => {
      delete assistant1Edit.changedPassword;
      const result = await service.editProfile(assistant1, assistant1Edit);
      expect(result.id).toBe(assistant1.id);
      expect(result.password).toBeUndefined();
    });
  });

  describe('Get List Overview (GET)', () => {
    it('should get user list overview', async () => {
      const result = await service.getUserListOverview();
      expect(result).not.toBeUndefined();
    });
  });

  describe('Get User List (GET)', () => {
    it('should throw if user list is empty', async () => {
      try {
        await service.getUserList(undefined, 10, 10);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should get user list without password', async () => {
      const result = await service.getUserList(undefined, 1, 10);
      expect(result).toBeInstanceOf(Array);
      expect(result[0].password).toBeUndefined();
    });
  });

  describe('Get User Info (GET)', () => {
    it('should throw if user not found', async () => {
      try {
        await service.getUserInfo(88978978);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
    it('should get user information', async () => {
      const result = await service.getUserInfo(user1.id);
      expect(result.id).toBe(user1.id);
      expect(result.password).toBeUndefined();
    });
  });

  describe('Change user status (PATCH)', () => {
    it('should throw if user not found', async () => {
      try {
        await service.changeUserStatus(98789978, {
          status: 'Approved',
          reason: 'Reason',
        });
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should change user status', async () => {
      const result = await service.changeUserStatus(user1.id, {
        status: 'Approved',
        reason: 'Member Approve',
      });
      expect(result.status).toBe('Approved');
    });
  });
});
