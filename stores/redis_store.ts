import OTPStore from '../utils/store_template';
import {
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from '@redis/client';

type RedisClient = RedisClientType<RedisFunctions, RedisModules, RedisScripts>;

class RedisStore extends OTPStore {
  private client: RedisClient;

  constructor(client: RedisClient) {
    super();
    this.client = client;
  }

  async get(key: string): Promise<number> {
    const value = await this.client.get(key);
    return value ? parseInt(value) : 0;
  }

  async set(key: string, value: number, ttl = 60): Promise<string | null> {
    return await this.client.set(key, value.toString(), { EX: ttl });
  }

  async del(key: string): Promise<number | null> {
    return await this.client.del(key);
  }
}

export default RedisStore;
