import { Module } from '@nestjs/common';
import { RouletteController } from './roulette.controller';
import { RouletteService } from './roulette.service';

@Module({
  controllers: [RouletteController],
  providers: [RouletteService],
})
export class RouletteModule {}
