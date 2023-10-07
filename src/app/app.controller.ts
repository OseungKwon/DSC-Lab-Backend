import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';

@Controller()
@ApiTags('Development Utility')
export class AppController {
  constructor(private readonly prisma: PrismaService) {
    console.log(process.env);
  }

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
