import { PrismaModule } from '@app/prisma/prisma.module';
import { PrismaService } from '@app/prisma/prisma.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { configOptions } from 'src/module-config/config.config';
import {
  Assistant1SignInDto,
  generateRandomMemberSignUpDto,
  TestUserSignUpDto,
} from 'test/payload.test';
import { MemberService } from './auth.service';
import { UserUniqueCredential } from './type';
import { User } from '@prisma/client';

describe('MemberService', () => {
  let service: MemberService;
  let prisma: PrismaService;

  const [user1Signup, user1Signin, user1Edit] =
    generateRandomMemberSignUpDto(false);
  let user1: User;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        JwtModule.register({}),
        ConfigModule.forRoot(configOptions),
      ],
      providers: [MemberService],
    }).compile();
    service = module.get<MemberService>(MemberService);
    prisma = module.get<PrismaService>(PrismaService);
    await prisma.deleteAll();
  });

  describe('Member Signup', () => {
    it('should sign-up', async () => {
      const result = await service.signup(user1Signup);
      expect(result.refreshToken).not.toBeUndefined();
      expect(result.accessToken).not.toBeUndefined;
    });

    it('should throw error if duplicated value found', async () => {
      try {
        await service.signup(user1Signup);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Member Signin', () => {
    it('should sign-in', async () => {
      const result = await service.singin(user1Signin);
      expect(result.refreshToken).not.toBeUndefined();
      expect(result.accessToken).not.toBeUndefined();
    });
    it('should throw error if password unmatched', async () => {
      try {
        await service.singin({
          email: user1Signin.email,
          password: 'wrong password',
        });
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
      }
    });
    it('should throw error if user not found', async () => {
      try {
        await service.singin(Assistant1SignInDto);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Check credential taken', () => {
    it('should get false', async () => {
      await prisma.user.create({
        data: {
          ...TestUserSignUpDto,
        },
      });
      const result = await service.credential(
        UserUniqueCredential.email,
        TestUserSignUpDto.email,
      );
      expect(result.result).toBe(false);
    });
    it('should get true', async () => {
      const result = await service.credential(
        UserUniqueCredential.email,
        'new@naver.com',
      );
      expect(result.result).toBe(true);
    });
    it('should throw if invalid credential type', async () => {
      try {
        const result = await service.credential(
          'something' as UserUniqueCredential,
          'bad request',
        );
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
