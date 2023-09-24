import { PrismaService } from '@app/prisma/prisma.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  Assistant1SignInDto,
  Assistant1SingUpDto,
  User1SignInDto,
} from 'test/payload.test';
import { AssistantAuthService } from './auth.service';
import { PrismaModule } from '@app/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { configOptions } from 'src/module-config/config.config';

describe('AssistantService', () => {
  let service: AssistantAuthService;
  let prisma: PrismaService;

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

  describe('Assistant SingUp', () => {
    it('should sign up', async () => {
      const result = await service.signup(Assistant1SingUpDto);
      expect(result.accessToken).not.toBeUndefined();
      expect(result.refreshToken).not.toBeUndefined();
    });

    it('should throw error if duplicated value found', async () => {
      try {
        await service.signup(Assistant1SingUpDto);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Assistant SignIn', () => {
    it('should signin', async () => {
      const result = await service.signin(Assistant1SignInDto);
      expect(result.accessToken).not.toBeUndefined();
      expect(result.refreshToken).not.toBeUndefined();
    });
    it('should throw if wrong password', async () => {
      try {
        await service.signin({
          email: Assistant1SignInDto.email,
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
});
