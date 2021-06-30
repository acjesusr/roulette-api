import { Module } from '@nestjs/common';
import { RouletteService } from './roulette.service';

@Module({
  providers: [RouletteService],
})
export class RouletteModule {}
