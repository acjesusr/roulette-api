import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
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
}
