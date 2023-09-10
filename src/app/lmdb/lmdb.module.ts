import { Global, Module } from '@nestjs/common';
import { LmdbService } from './lmdb.service';

@Global()
@Module({
  providers: [LmdbService],
  exports: [LmdbService],
})
export class LmdbModule {}
