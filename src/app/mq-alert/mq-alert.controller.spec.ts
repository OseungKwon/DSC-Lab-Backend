import { Test, TestingModule } from '@nestjs/testing';
import { MqAlertController } from './mq-alert.controller';

describe('MqAlertController', () => {
  let controller: MqAlertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MqAlertController],
    }).compile();

    controller = module.get<MqAlertController>(MqAlertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
