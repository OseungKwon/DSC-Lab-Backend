import { CommonResponseDto } from '@app/common.response.dto';
import { MailService } from '@app/mail/mail.service';
import { PrismaService } from '@app/prisma/prisma.service';
import { JwtPayload } from '@infrastructure/types/type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Status, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcryptjs';
import { Cache } from 'cache-manager';
import { v4 } from 'uuid';
import { expireDate, hashCount } from '../common';
import { emailConfirmTemplate } from '../template/email-confirm.template';
import { MemberAuthInterface } from './auth.interface';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { MemberSignInDto } from './dto/sign-in.dto';
import { MemberSignUpDto } from './dto/sign-up.dto';
import { AuthResponse } from './response/auth.response';
import { UserUniqueCredential } from './type';

@Injectable()
export class MemberService implements MemberAuthInterface {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private mail: MailService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async signup(dto: MemberSignUpDto) {
    const findAvailable = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            nickname: dto.nickname,
          },
          {
            email: dto.email,
          },
          {
            groupId: dto.groupId,
          },
        ],
      },
    });

    /** email or groupdId duplicated */
    if (findAvailable.length) {
      throw new BadRequestException('Credential Taken');
    }
    /** Hash password */
    dto.password = await bcrypt.hash(dto.password, hashCount);

    /** Create user */
    const [{ id, email }] = await this.prisma.$transaction([
      this.prisma.user.create({
        data: {
          ...dto,
        },
      }),
    ]);

    return this.getToken(id, email);
  }

  async singin(dto: MemberSignInDto) {
    const { email, password } = dto;
    let findUser: User;
    try {
      /** Update user's login time and get user object. */
      findUser = await this.prisma.user.update({
        where: {
          email,
        },
        data: {
          loginAt: new Date(),
        },
      });
    } catch (err) {
      throw new BadRequestException('Member not found');
    }

    /** validate password */
    const validatePassword = await bcrypt.compare(password, findUser.password);

    if (!validatePassword) {
      throw new UnauthorizedException('Password unmatched');
    }

    return this.getToken(findUser.id, findUser.email);
  }

  async credential(type: UserUniqueCredential, value: string) {
    let findOption: Prisma.UserWhereUniqueInput;
    switch (type) {
      case 'email':
        findOption = {
          email: value,
        };
        break;
      case 'groupId':
        findOption = {
          groupId: value,
        };
        break;
      case 'nickname':
        findOption = {
          nickname: value,
        };
        break;
      default:
        throw new BadRequestException('Unknown credential type');
    }
    const user = await this.prisma.user.findUnique({
      where: findOption,
    });
    /** If credential taken : false, If it's available: true */
    return {
      result: user ? false : true,
    };
  }

  async confirmEmail(uid: number) {
    let findUser: User;
    try {
      /** Get user who is pending state. Pending state is people who is waiting for confirm */
      findUser = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: uid,
        },
      });
    } catch (err) {
      /** If user not found */
      if (err instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('USER_NOT_FOUND');
      }
      throw err;
    }

    /** If user status not pending -> BadRequest */
    if (findUser.status !== Status.Pending) {
      throw new BadRequestException('USER_ALREADY_APPROVED');
    }

    /** Enroll user confirm key to redis */
    const randomCode = v4();

    await this.cache.set(
      this.getUserConfirmKey(findUser.id, findUser.email),
      randomCode,
    );
    console.log(
      await this.cache.get(this.getUserConfirmKey(findUser.id, findUser.email)),
    );

    /** Get template */
    const template = emailConfirmTemplate(
      '/user/auth/email',
      findUser.name,
      findUser.id,
      randomCode,
    );

    /** Send mail */
    await this.mail.sendMail({
      to: findUser.email,
      subject: '홍익대학교 소프트웨어 융합학과 이메일 인증',
      content: template,
    });

    return new CommonResponseDto({ msg: 'Ok' });
  }

  async confirmEmailCode(uid: number, code: string) {
    let findUser: User;
    try {
      findUser = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: uid,
        },
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('MEMBER_NOT_FOUND');
      }
      throw err;
    }
    if (findUser.status !== Status.Pending) {
      throw new BadRequestException('USER_ALREADY_APPROVED');
    }

    /** Get user key */
    const key = this.getUserConfirmKey(findUser.id, findUser.email);
    /** Get user code enrolled in redis */
    const userCode = await this.cache.get(key);

    /** If code unmatched */
    if (userCode !== code) {
      throw new BadRequestException('CODE_UNMATCHED');
    }

    /** Update user to approved state */
    await this.prisma.user.update({
      where: {
        id: findUser.id,
      },
      data: {
        status: Status.Approved,
      },
    });

    /** If code matched. Delete code from redis */
    this.cache.del(key);

    return new CommonResponseDto({
      msg: 'Ok',
    });
  }

  private getUserConfirmKey(id: number, email: string) {
    return `${id}-${email}`;
  }

  private async getToken(id: number, email: string): Promise<AuthResponse> {
    const payload: JwtPayload = {
      id,
      email,
    };
    const accessToken = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>('JWT_TOKEN'),
      expiresIn: expireDate.accessToken,
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>('JWT_TOKEN'),
      expiresIn: expireDate.refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
