import { expect, test } from 'vitest';
import RedisStore from '../../otp_store/redis_store';
import { createClient } from '@redis/client';

test('Test Redis Store', async () => {
  const redisClient = createClient({
    url: 'redis://:1234567890@localhost:6379',
  });

  redisClient.connect();
  const redisStore = new RedisStore(redisClient);

  await redisStore.set('test', 123, 60).then(() => {});
  await redisStore.get('test').then(value => {
    console.log(value);
    expect(value).toBe(123);
  });
  await redisStore.del('test').then(() => {});
  await redisStore.get('test').then(value => {
    expect(value).toBe(0);
  });
});
