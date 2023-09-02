import { Injectable } from '@nestjs/common';
import { AlertStrategy } from './strategy/alert.strategy.interface';

@Injectable()
export class AlertService {
  constructor(private readonly strategies: AlertStrategy[]) {}
}
