import { BetColor } from '../enums/bet-color.enum';

export interface MapUserBet {
  rouletteBets: Record<string, string>;
  rouletteNumber: number;
  rouletteColor: BetColor;
  userId: string;
}
