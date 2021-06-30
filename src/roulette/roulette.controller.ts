import {
  Controller,
  Get,
  Post,
} from '@nestjs/common';

@Controller('roulettes')
export class RouletteController {
  constructor(private readonly rouletteService: RouletteService) {}

  @Get()
  async getRouletteStatuses(): Promise<any> {
    const roulettes = await this.rouletteService.findAll();

    return {
      roulettes,
    };
  }

  @Post()
  async createRoulette(): Promise<any> {
    const roulette = await this.rouletteService.create();

    return {
      rouletteId: roulette.id,
    };
  }
}
