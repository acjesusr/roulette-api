import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';
import { AppController } from './app.controller';
import configuration from './config/configuration';
import { RouletteModule } from './roulette/roulette.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        url: configService.get('redisUrl'),
      }),
      inject: [ConfigService],
    }),
    RouletteModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
