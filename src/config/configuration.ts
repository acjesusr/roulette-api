import { Configuration } from './interfaces/configuration.interface';

export default function(): Configuration {
  return {
    redisUrl: process.env.REDIS_URL,
  };
}
