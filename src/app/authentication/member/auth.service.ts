import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { MemberAuthInterface } from './auth.interface';
import { PrismaService } from '@app/prisma/prisma.service';
import { MemberSignUpDto } from './dto/sign-up.dto';
import { MemberSignInDto } from './dto/sign-in.dto';
import { AuthResponse } from './response/auth.response';
import { JwtPayload } from '@infrastructure/types/type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { expireDate, hashCount } from '../common';
import * as bcrypt from 'bcryptjs';
import { Prisma, User } from '@prisma/client';
import { UserUniqueCredential } from './type';

@Injectable()
export class MemberService implements MemberAuthInterface {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
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
      findUser = await this.prisma.user.findUniqueOrThrow({
        where: {
          email,
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

  private async getToken(id: string, email: string): Promise<AuthResponse> {
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
