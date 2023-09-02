import { Injectable } from '@nestjs/common';
import { AlertStrategy } from './strategy/alert.strategy.interface';
import { FilteredException } from '@infrastructure/types/type';

@Injectable()
export class AlertService implements AlertStrategy {
  constructor(private readonly strategies: AlertStrategy[]) {}
  async send(message: FilteredException): Promise<void> {
    console.log('AlertService');
  }
}
