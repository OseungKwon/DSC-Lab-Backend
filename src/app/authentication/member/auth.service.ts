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
import { User } from '@prisma/client';

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
      throw new BadRequestException('Duplicated value found');
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
