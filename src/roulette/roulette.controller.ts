import {
  Controller,
  Get,
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

}
