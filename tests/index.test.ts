import { expect, test } from 'vitest'
import OTPManager from '..'
import { createClient } from '@redis/client'
import RedisStore from '../otp_store/redis_store'


test('Test OTP Manager with default Map store', async () => {
    const otpManager = new OTPManager({
        purpose: "Login",
        otpLength: 6,
        expirationTime: 60,
    });

    const otp = await otpManager.generate("TestUser");
    expect(await otpManager.verify("TestUser", otp)).toBe(true);
})

test('Test OTP Manager with Redis store', async () => {
    const redisClient = createClient({
        url: 'redis://:1234567890@localhost:6379'
    });

    redisClient.connect();
    const redisStore = new RedisStore(redisClient);
    const otpManager = new OTPManager({
        purpose: "Login",
        otpLength: 6,
        expirationTime: 500000,
        store: redisStore,
    });

    const otp = await otpManager.generate("TestUser");
    expect(String(otp)).toHaveLength(6)
    await new Promise(resolve => setTimeout(resolve, 10000));
    expect(await otpManager.verify("TestUser", otp)).toBe(true);
}, {timeout: 500000})