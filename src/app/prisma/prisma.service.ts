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

  async deleteAll() {
    try {
      await this.$transaction([
        this.assistant.deleteMany(),
        this.user.deleteMany(),
      ]);
    } catch (err) {
    } finally {
      return true;
    }
  }
}
