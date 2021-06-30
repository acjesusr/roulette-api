import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RouletteModule } from './roulette/roulette.module';

@Module({
  imports: [RouletteModule],
  controllers: [AppController],
})
export class AppModule {}
