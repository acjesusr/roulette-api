import { RouletteStatus } from '../enums/roulette-status.enum';

export interface Roulette {
  id: string;
  status: RouletteStatus;
}
