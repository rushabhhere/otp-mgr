import { expect, test } from 'vitest'
import RedisStore from '../../otp_store/redis_store'
import { createClient } from '@redis/client'

test('Test OTP Manager with default Map store', async () => {
    const redisClient = createClient({
        url: 'redis://:1234567890@localhost:6379'
    });

    redisClient.connect();
    const redisStore = new RedisStore(redisClient);

    redisStore.set('test', 123, 60).then(() => { });
    redisStore.get('test').then(value => { expect(value).toBe(123) });
})