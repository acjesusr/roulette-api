import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RouletteService } from './roulette.service';

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

  @Patch(':id')
  async openRoulette(@Param('id') rouletteId: string): Promise<any> {
    try {
      await this.rouletteService.setRouletteOpen(rouletteId);

      return {
        status: 'success',
      };
    } catch (error) {
      return {
        status: 'error',
        error,
      };
    }
  }
}
