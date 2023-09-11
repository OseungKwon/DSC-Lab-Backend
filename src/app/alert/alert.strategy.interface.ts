import { FilteredException } from '@infrastructure/types/type';
import { AvailableStrategies } from './strategy/type';

export abstract class AlertService {
  abstract sendError(message: FilteredException): Promise<void>;
  abstract getStrategy(): AvailableStrategies;
}
