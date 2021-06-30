import { BetType } from '../enums/bet-type.enum';

export interface BetResult {
  userId: string;
  betType: BetType;
  hasWon: boolean;
  amount: number;
}
