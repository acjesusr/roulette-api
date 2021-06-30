import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { v4 as uuidV4 } from 'uuid';
import { RouletteStatus } from './enums/roulette-status.enum';
import { Roulette } from './interfaces/roulette.interface';

@Injectable()
export class RouletteService {
  constructor(private readonly redisService: RedisService) {}

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

}
