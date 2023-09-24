import { PrismaModule } from '@app/prisma/prisma.module';
import { PrismaService } from '@app/prisma/prisma.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { configOptions } from 'src/module-config/config.config';
import {
  Assistant1SignInDto,
  User1SignInDto,
  User1SignUpDto,
} from 'test/payload.test';
import { MemberService } from './auth.service';

describe('MemberService', () => {
  let service: MemberService;
  let prisma: PrismaService;

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
      const result = await service.signup(User1SignUpDto);
      expect(result.refreshToken).not.toBeUndefined();
      expect(result.accessToken).not.toBeUndefined;
    });

    it('should throw error if duplicated value found', async () => {
      try {
        await service.signup(User1SignUpDto);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Member Signin', () => {
    it('should sign-in', async () => {
      const result = await service.singin(User1SignInDto);
      expect(result.refreshToken).not.toBeUndefined();
      expect(result.accessToken).not.toBeUndefined();
    });
    it('should throw error if password unmatched', async () => {
      try {
        await service.singin({
          email: User1SignInDto.email,
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
});
