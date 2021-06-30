import { BetColor } from '../enums/bet-color.enum';
import { BetResult } from './bet-result.interface';

export interface CloseRouletteResult {
  number: number;
  color: BetColor;
  gamblers: BetResult[];
}
