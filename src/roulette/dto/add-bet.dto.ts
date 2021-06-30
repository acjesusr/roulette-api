import { IsEnum, IsNumber, Max, Min, ValidateIf } from 'class-validator';
import { BetColor } from '../enums/bet-color.enum';
import { BetType } from '../enums/bet-type.enum';

export class AddBetDto {
  @IsEnum(BetType, {
    message: `Please choose a valid option for a bet's type`,
  })
  type: BetType;

  @ValidateIf(obj => obj.type === BetType.Color)
  @IsEnum(BetType, {
    message: `Please choose a valid option for a bet's color`,
  })
  color?: BetColor;

  @ValidateIf(obj => obj.type === BetType.Number)
  @IsNumber({}, { message: `Bet's number should be a number` })
  @Min(0, {
    message: `The bet's number should be greater or equal to 0`,
  })
  @Max(36, {
    message: `The bet's number should be less or equal to 36`,
  })
  number?: number;
}
