import { Injectable } from '@nestjs/common';

// Thrid party package
import { RootDatabase, open } from 'lmdb';

@Injectable()
export class LmdbService {
  private db: RootDatabase;
  constructor() {
    // Path : Path of generated database
    this.db = open({
      path: `${__dirname}/db`,
    });
  }

  public get(key: string): any {
    return this.db.get(key);
  }

  // Restrict key as string
  public async insert(key: string, value: any): Promise<boolean> {
    if (this.db.doesExist(key)) {
      throw new Error(`Key ${key} already in used`);
    }
    return await this.db.transaction(() => {
      return this.db.put(key, value);
    });
  }

  public async remove(key: string): Promise<boolean> {
    return await this.db.transaction(() => {
      return this.db.remove(key);
    });
  }
}
