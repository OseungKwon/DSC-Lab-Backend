import { PrismaService } from '@app/prisma/prisma.service';
import { JwtPayload } from '@infrastructure/types/type';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Status } from '@prisma/client';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(private config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_TOKEN'),
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new ForbiddenException('Invalid authentication');
    }
    return user;
  }
}
