import { PrismaService } from '@app/prisma/prisma.service';
import {
  BadRequestException,
  INestApplication,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Assistant, User } from '@prisma/client';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import {
  generateRandomAssistant,
  generateRandomMember,
} from 'test/payload.test';

/**
 * Test user, assistant Auth API
 */

export default describe('AuthController', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  /** Assistant1 */
  const [assistant1Signup, assistant1Signin, assistant1Edit] =
    generateRandomAssistant(false);
  let assistant1: Assistant;

  /** User1 */
  const [user1Signup, user1Signin, user1Edit] = generateRandomMember(false);
  let user1: User;

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testModule.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    prisma = app.get<PrismaService>(PrismaService);
    await app.init();
    await app.listen(0);
  });

  afterAll(async () => {
    /** Close Nest.js App */
    await app.close();
  });

  /** Assistant Auth */
  describe('/assistant/auth', () => {
    /** Sign Up */
    describe('/signup (POST)', () => {
      it('should sign up', () => {
        return request(app.getHttpServer())
          .post('/assistant/auth/signup')
          .send(assistant1Signup)
          .expect(201);
      });
      it('should throw if credential already taken', () => {
        return request(app.getHttpServer())
          .post('/assistant/auth/signup')
          .send(assistant1Signup)
          .expect(400);
      });
    });

    /** Sign In */
    describe('/signin (POST)', () => {
      it('should sign in', async () => {
        const result = (
          await request(app.getHttpServer())
            .post('/assistant/auth/signin')
            .send(assistant1Signin)
            .expect(200)
        ).body;
        expect(result.accessToken).not.toBeUndefined();
        expect(result.refreshToken).not.toBeUndefined();
      });
      it('should throw if password unmatched', async () => {
        try {
          const fakeSignin = { ...assistant1Signin };
          fakeSignin.password = 'Wrong Password';
          await request(app.getHttpServer())
            .post('/assistant/auth/signin')
            .send(fakeSignin);
        } catch (err) {
          expect(err).toBeInstanceOf(UnauthorizedException);
        }
      });

      it('should throw if user not exist', async () => {
        try {
          const fakeSignin = { ...assistant1Signin };
          fakeSignin.email = 'fake@email.com';
          await request(app.getHttpServer())
            .post('/assistant/auth/signin')
            .send(fakeSignin);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });
    });

    /** Credential check */
    describe('/credential (GET)', () => {
      it('should check false if credential already taken', async () => {
        const result = await request(app.getHttpServer())
          .get('/assistant/auth/credential')
          .query({
            type: 'email',
            value: assistant1Signin.email,
          })
          .expect(200);
        expect(result.body.result).toBe(false);
      });
    });
    it('should check true if credential not taken', async () => {
      const result = await request(app.getHttpServer())
        .get('/assistant/auth/credential')
        .query({
          type: 'email',
          value: 'test12@naver.com',
        })
        .expect(200);
      expect(result.body.result).toBe(true);
    });
  });

  describe('/user/auth', () => {
    /** Sign Up */
    describe('/signup (POST)', () => {
      it('should sign up', () => {
        return request(app.getHttpServer())
          .post('/user/auth/signup')
          .send(user1Signup)
          .expect(201);
      });
      it('should throw if credential already taken', () => {
        return request(app.getHttpServer())
          .post('/user/auth/signup')
          .send(user1Signup)
          .expect(400);
      });
    });

    /** Sign In */
    describe('/signin (POST)', () => {
      it('should sign in', async () => {
        const result = (
          await request(app.getHttpServer())
            .post('/user/auth/signin')
            .send(user1Signin)
            .expect(200)
        ).body;
        expect(result.accessToken).not.toBeUndefined();
        expect(result.refreshToken).not.toBeUndefined();
      });
      it('should throw if password unmatched', async () => {
        try {
          const fakeSignin = { ...user1Signin };
          fakeSignin.password = 'Wrong Password';
          await request(app.getHttpServer())
            .post('/user/auth/signin')
            .send(fakeSignin);
        } catch (err) {
          expect(err).toBeInstanceOf(UnauthorizedException);
        }
      });

      it('should throw if user not exist', async () => {
        try {
          const fakeSignin = { ...user1Signin };
          fakeSignin.email = 'fake@email.com';
          await request(app.getHttpServer())
            .post('/user/auth/signin')
            .send(fakeSignin);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
        }
      });
    });

    /** Credential check */
    describe('/credential (GET)', () => {
      it('should check false if credential already taken', async () => {
        const result = await request(app.getHttpServer())
          .get('/user/auth/credential')
          .query({
            type: 'email',
            value: user1Signin.email,
          })
          .expect(200);
        expect(result.body.result).toBe(false);
      });
    });
    it('should check true if credential not taken', async () => {
      const result = await request(app.getHttpServer())
        .get('/user/auth/credential')
        .query({
          type: 'email',
          value: 'test12@naver.com',
        })
        .expect(200);
      expect(result.body.result).toBe(true);
    });
  });
});
