import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasourceUrl:
        'mongodb://root:password1234!@localhost:27017/dsc-be?retryWrites=false&authSource=admin',
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
