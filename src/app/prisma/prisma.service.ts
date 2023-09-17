// Standard Packages
import { Injectable, OnModuleInit } from '@nestjs/common';
// Third-party packages
import { PrismaClient } from '@prisma/client';
// Custom Packages

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
