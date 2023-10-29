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
  constructor() {
    super();
    Object.assign(
      this,
      this.$extends({
        query: {
          form: {
            /** Extends query for except isArchived false */
            async groupBy({ model, operation, args, query }) {
              args.where = { ...args.where, isArchived: false };
              return query(args);
            },
            async findFirst({ model, operation, args, query }) {
              args.where = { ...args.where, isArchived: false };
              return query(args);
            },
            async findMany({ model, operation, args, query }) {
              args.where = { ...args.where, isArchived: false };
              return query(args);
            },
            async findUnique({ model, operation, args, query }) {
              args.where = { ...args.where, isArchived: false };
              return query(args);
            },
            async findFirstOrThrow({ model, operation, args, query }) {
              args.where = { ...args.where, isArchived: false };
              return query(args);
            },
            async findUniqueOrThrow({ model, operation, args, query }) {
              args.where = { ...args.where, isArchived: false };
              return query(args);
            },
            async update({ model, operation, args, query }) {
              args.where = { ...args.where, isArchived: false };
              return query(args);
            },
            async updateMany({ model, operation, args, query }) {
              args.where = { ...args.where, isArchived: false };
              return query(args);
            },
            async delete({ model, operation, args, query }) {
              args.where = { ...args.where, isArchived: false };
              return query(args);
            },
            async deleteMany({ model, operation, args, query }) {
              args.where = { ...args.where, isArchived: false };
              return query(args);
            },
          },
        },
      }),
    );
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
