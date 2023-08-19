import { Test, TestingModule } from '@nestjs/testing';
import { UlidService } from './ulid.service';

describe('UlidService', () => {
  let service: UlidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UlidService],
    }).compile();

    service = module.get<UlidService>(UlidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
