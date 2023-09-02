import { IncomingWebhook } from '@slack/webhook';
import { AlertStrategy } from './alert.strategy.interface';
import { Injectable, Inject } from '@nestjs/common';
import { FilteredException } from '@infrastructure/types/type';
import { ALERT_TOKEN } from './alert.token';

@Injectable()
export class SlackStrategyService implements AlertStrategy {
  constructor(@Inject(ALERT_TOKEN) private readonly webHookURL: string) {}

  async send(message: FilteredException): Promise<void> {}
}
