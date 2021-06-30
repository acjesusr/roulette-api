import { Bet } from './bet.interface';

export interface AddBet {
  rouletteId: string;
  userId: string;
  bet: Bet;
}
