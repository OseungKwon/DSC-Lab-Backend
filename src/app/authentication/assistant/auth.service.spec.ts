// Standard Packages
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

// Third-party Packages
import { Assistant } from '@prisma/client';

// Custom Packages
import { PrismaModule } from '@app/prisma/prisma.module';
import { PrismaService } from '@app/prisma/prisma.service';
import { configOptions } from 'src/module-config/config.config';
import { User1SignInDto, generateRandomAssistant } from 'test/payload.test';
import { AssistantAuthService } from './auth.service';
import { AssistantUniqueCredential } from './type';

describe('AssistantService', () => {
  let service: AssistantAuthService;
  let prisma: PrismaService;

  const [assistant1Signup, assistant1Signin, assistant1Edit] =
    generateRandomAssistant(false);
  let assistant1: Assistant;

  const [assistant2Signup, assistant2Signin, assistant2Edit] =
    generateRandomAssistant(false);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        JwtModule.register({}),
        ConfigModule.forRoot(configOptions),
      ],
      providers: [AssistantAuthService],
    }).compile();
    service = module.get<AssistantAuthService>(AssistantAuthService);
    prisma = module.get<PrismaService>(PrismaService);
    await prisma.deleteAll();
  });

  afterAll(async () => {
    await prisma.deleteAll();
  });

  describe('Assistant SingUp', () => {
    it('should sign up', async () => {
      const result = await service.signup(assistant1Signup);
      expect(result.accessToken).not.toBeUndefined();
      expect(result.refreshToken).not.toBeUndefined();
    });

    it('should throw error if duplicated value found', async () => {
      try {
        await service.signup(assistant1Signup);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Assistant SignIn', () => {
    it('should signin', async () => {
      const result = await service.signin(assistant1Signin);
      expect(result.accessToken).not.toBeUndefined();
      expect(result.refreshToken).not.toBeUndefined();
    });
    it('should throw if wrong password', async () => {
      try {
        await service.signin({
          email: assistant1Signin.email,
          password: 'wrong-password',
        });
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
      }
    });
    it('should throw if user not found', async () => {
      try {
        await service.signin(User1SignInDto);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Check credential taken', () => {
    it('should get false', async () => {
      await prisma.assistant.create({
        data: {
          ...assistant2Signup,
        },
      });
      const result = await service.credential(
        AssistantUniqueCredential.email,
        assistant2Signup.email,
      );
      expect(result.result).toBe(false);
    });
    it('should get true', async () => {
      const result = await service.credential(
        AssistantUniqueCredential.email,
        'newemail@email.com',
      );
      expect(result.result).toBe(true);
    });
    it('should throw if invalid credential type', async () => {
      try {
        await service.credential(
          'something' as AssistantUniqueCredential,
          'bad request',
        );
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
