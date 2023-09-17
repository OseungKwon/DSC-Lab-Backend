import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello() {
    this.prisma.$transaction([
      this.prisma.errorLog.create({
        data: {
          endpoint: 'aa',
        },
      }),
    ]);
    return true;
    // return this.appService.getHello();
  }
}
