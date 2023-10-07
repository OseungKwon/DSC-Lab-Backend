import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';
import { MailService } from './mail/mail.service';

@Controller()
@ApiTags('Development Utility')
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  @Get('cleandb')
  @ApiOperation({
    description: 'Clear all database. This is for development mode only',
  })
  public async cleanDB() {
    await this.prisma.$transaction([
      this.prisma.user.deleteMany(),
      this.prisma.assistant.deleteMany(),
    ]);
  }
}
