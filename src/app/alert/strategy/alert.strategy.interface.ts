import { FilteredException } from '@infrastructure/types/type';

export interface AlertStrategy {
  send(message: FilteredException): Promise<void>;
}
