import { FilteredException } from '@infrastructure/types/type';
import { AvailableStrategies } from './type';

export interface AlertStrategy {
  sendError(message: FilteredException, error: Error): Promise<void>;
  getStrategy(): AvailableStrategies;
}
