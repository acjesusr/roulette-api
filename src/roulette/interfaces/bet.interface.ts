import { BetColor } from '../enums/bet-color.enum';
import { BetType } from '../enums/bet-type.enum';

export interface Bet {
  type: BetType;
  color?: BetColor;
  number?: number;
}
