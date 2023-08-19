import { Injectable } from '@nestjs/common';
import { ULID, monotonicFactory } from 'ulid';

@Injectable()
export class UlidService {
  private ulidGenerator: ULID;
  constructor() {
    this.ulidGenerator = monotonicFactory();
  }

  public async getNewUlid(): Promise<string> {
    return this.ulidGenerator();
  }
}
