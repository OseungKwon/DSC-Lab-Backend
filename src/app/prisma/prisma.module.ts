// Standard Packages
import { Global, Module } from '@nestjs/common';

// Third-party packages

// Custom Packages
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
