import { PrismaService } from '@app/prisma/prisma.service';
import { JwtPayload } from '@infrastructure/types/type';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Assistant, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { expireDate, hashCount } from '../common';
import { AuthResponse } from '../member/response/auth.response';
import { AssistantAuthInterface } from './auth.interface';
import { AssistantSignInDto } from './dto/sign-in.dto';
import { AssistantSignUpDto } from './dto/sign-up.dto';
import { AssistantUniqueCredential } from './type';

@Injectable()
export class AssistantAuthService implements AssistantAuthInterface {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AssistantSignUpDto) {
    const findAvailable = await this.prisma.assistant.findMany({
      where: {
        email: dto.email,
      },
    });

    /** check if email duplicated */
    if (findAvailable.length) {
      throw new BadRequestException('Duplciated value found');
    }

    /** hash password */
    dto.password = await bcrypt.hash(dto.password, hashCount);

    /** Create Assistant */
    const [{ id, email }] = await this.prisma.$transaction([
      this.prisma.assistant.create({
        data: {
          ...dto,
        },
      }),
    ]);

    return this.getToken(id, email);
  }
  async signin(dto: AssistantSignInDto) {
    const { email, password } = dto;
    let findAssistant: Assistant;
    try {
      findAssistant = await this.prisma.assistant.findUniqueOrThrow({
        where: {
          email,
        },
      });
    } catch (err) {
      throw new BadRequestException('Member not found');
    }

    /** validate password */
    const validatePassword = await bcrypt.compare(
      password,
      findAssistant.password,
    );

    if (!validatePassword) {
      throw new UnauthorizedException('Password unmatched');
    }
    return this.getToken(findAssistant.id, findAssistant.email);
  }

  async credential(type: AssistantUniqueCredential, value: string) {
    let findOption: Prisma.AssistantWhereUniqueInput;
    switch (type) {
      case AssistantUniqueCredential.email:
        findOption = {
          email: value,
        };
        break;
      default:
        throw new BadRequestException('Unknown credential type');
    }
    const user = await this.prisma.assistant.findUnique({
      where: findOption,
    });

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
