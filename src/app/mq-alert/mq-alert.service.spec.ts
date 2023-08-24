import { Test, TestingModule } from '@nestjs/testing';
import { MqAlertService } from './mq-alert.service';

describe('MqAlertService', () => {
  let service: MqAlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MqAlertService],
    }).compile();

    service = module.get<MqAlertService>(MqAlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
