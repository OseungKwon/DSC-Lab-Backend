import { Injectable } from '@nestjs/common';
import { AlertStrategy } from './strategy/alert.strategy.interface';
import { FilteredException } from '@infrastructure/types/type';
import { AvailableStrategies } from './strategy/type';

@Injectable()
export class AlertService implements AlertStrategy {
  constructor(private readonly strategies: AlertStrategy[]) {}
  getStrategy(): AvailableStrategies {
    throw new Error('Method not implemented.');
  }
  async sendError(message: FilteredException, error: Error): Promise<void> {
    console.log('AlertService');
  }
}
