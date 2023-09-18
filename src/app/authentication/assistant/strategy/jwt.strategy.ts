// Standard Packages
import { ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

// Third-party Packages
import { ExtractJwt, Strategy } from 'passport-jwt';

// Custom pacakges
import { PrismaService } from '@app/prisma/prisma.service';
import { JwtPayload } from '@infrastructure/types/type';

export class AssistantJwtStrategy extends PassportStrategy(
  Strategy,
  'assist-jwt',
) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_TOKEN'),
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const assistant = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!assistant) {
      throw new ForbiddenException('Invalid authentication');
    }

    // delet assistant password
    delete assistant.password;
    return assistant;
  }
}
