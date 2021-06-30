import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { v4 as uuidV4 } from 'uuid';
import { COLOR_BET_RATE, NUMBER_BET_RATE } from './constants';
import { BetColor } from './enums/bet-color.enum';
import { BetType } from './enums/bet-type.enum';
import { RouletteStatus } from './enums/roulette-status.enum';
import { AddBet } from './interfaces/add-bet.interface';
import { BetResult } from './interfaces/bet-result.interface';
import { MapUserBet } from './interfaces/map-user-bet.interface';
import { Roulette } from './interfaces/roulette.interface';

@Injectable()
export class RouletteService {
  constructor(private readonly redisService: RedisService) {}

  private mapUserBet(params: MapUserBet): BetResult {
    const { rouletteBets, rouletteNumber, rouletteColor, userId } = params;
    const userBet = JSON.parse(rouletteBets[userId]);
    if (userBet.type === BetType.Number) {
      const hasWon = userBet.number === rouletteNumber;
      return {
        userId,
        betType: BetType.Number,
        hasWon,
        amount: hasWon ? userBet.amount * NUMBER_BET_RATE : userBet.amount,
      };
    } else {
      const hasWon = userBet.color === rouletteColor;
      return {
        userId,
        betType: BetType.Color,
        hasWon,
        amount: hasWon ? userBet.amount * COLOR_BET_RATE : userBet.amount,
      };
    }
  }

  async findAll(): Promise<Roulette[]> {
    const redisClient = this.redisService.getClient();
    const roulettesString = await redisClient.hgetall('roulettes');
    const roulettes: Roulette[] = Object.keys(roulettesString).map(rouletteId =>
      JSON.parse(roulettesString[rouletteId]),
    );

    return roulettes;
  }

  async findById(id: string): Promise<Roulette> {
    const redisClient = this.redisService.getClient();
    const roulette: Roulette = JSON.parse(
      await redisClient.hget('roulettes', id),
    );

    return roulette;
  }

  async create(): Promise<Roulette> {
    const roulette: Roulette = {
      id: uuidV4(),
      status: RouletteStatus.closed,
    };
    const redisClient = this.redisService.getClient();
    await redisClient.hset('roulettes', roulette.id, JSON.stringify(roulette));

    return roulette;
  }

  async setRouletteOpen(rouletteId: string): Promise<void> {
    const redisClient = this.redisService.getClient();
    const roulette = await this.findById(rouletteId);
    if (roulette.status === RouletteStatus.open) {
      throw new Error('The roulette is already open');
    }
    await redisClient.hset(
      'roulettes',
      roulette.id,
      JSON.stringify({ ...roulette, status: RouletteStatus.open }),
    );
  }

  async setRouletteClose(rouletteId: string): Promise<BetResult[]> {
    const redisClient = this.redisService.getClient();
    const roulette = await this.findById(rouletteId);
    if (roulette.status === RouletteStatus.closed) {
      throw new Error('The roulette is already closed');
    }
    const rouletteNumber = Math.floor(Math.random() * 36);
    const rouletteColor =
      rouletteNumber % 2 === 0 ? BetColor.Red : BetColor.Black;
    const rouletteBets = await redisClient.hgetall(
      `roulettes/${rouletteId}/bets`,
    );
    const betResults = Object.keys(rouletteBets).map(userId =>
      this.mapUserBet({
        rouletteBets,
        rouletteNumber,
        rouletteColor,
        userId,
      }),
    );

    return betResults;
  }

  async addBet(params: AddBet): Promise<void> {
    const { rouletteId, userId, bet } = params;
    const redisClient = this.redisService.getClient();
    const roulette = await this.findById(rouletteId);
    if (roulette.status === RouletteStatus.closed) {
      throw new Error('The roulette is not open for bets');
    }
    await redisClient.hset(
      `roulettes/${rouletteId}/bets`,
      userId,
      JSON.stringify(bet),
    );
  }
}
