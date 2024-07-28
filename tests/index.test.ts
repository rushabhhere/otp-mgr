import { expect, test } from 'vitest'
import OTPManager from '..'
import { createClient } from '@redis/client'
import RedisStore from '../otp_store/redis_store'
import MemcachedStore from '../otp_store/memcached_store'
import Memcached from 'memcached'

test.concurrent('Test OTP Manager with default Map store', { timeout: 15000 }, async () => {
    const otpManager = new OTPManager({
        purpose: "Login",
        otpLength: 6,
        expirationTime: 5,
    });

    const otp = await otpManager.generate("TestUser");
    expect(String(otp)).toHaveLength(6)
    expect(await otpManager.verify("TestUser", otp)).toBe(true);
    await new Promise(resolve => setTimeout(resolve, 10000));
    expect(await otpManager.verify("TestUser", otp)).toBe(false);
})

test.concurrent('Test OTP Manager with Redis store', { timeout: 15000 }, async () => {
    const redisClient = createClient({
        url: 'redis://:1234567890@localhost:6379'
    });

    redisClient.connect();
    const redisStore = new RedisStore(redisClient);
    const otpManager = new OTPManager({
        purpose: "Login",
        otpLength: 6,
        expirationTime: 5,
        store: redisStore,
    });

    const otp = await otpManager.generate("TestUser");
    expect(String(otp)).toHaveLength(6)
    expect(await otpManager.verify("TestUser", otp)).toBe(true);
    await new Promise(resolve => setTimeout(resolve, 10000));
    expect(await otpManager.verify("TestUser", otp)).toBe(false);
})

test.concurrent('Test OTP Manager with Redis store for Valkey', { timeout: 15000 }, async () => {
    const valkeyClient = createClient({
        url: 'redis://:1234567890@localhost:6380',
    });

    valkeyClient.connect();
    const redisStore = new RedisStore(valkeyClient);
    const otpManager = new OTPManager({
        purpose: "Login",
        otpLength: 6,
        expirationTime: 5,
        store: redisStore,
    });

    const otp = await otpManager.generate("TestUser");
    expect(String(otp)).toHaveLength(6)
    expect(await otpManager.verify("TestUser", otp)).toBe(true);
    await new Promise(resolve => setTimeout(resolve, 10000));
    expect(await otpManager.verify("TestUser", otp)).toBe(false);
})

test.concurrent('Test OTP Manager with Memcached store', { timeout: 15000 }, async () => {
    var memcached = new Memcached(['127.0.0.1:11211'])

    const memcachedStore = new MemcachedStore(memcached);
    const otpManager = new OTPManager({
        purpose: "Login",
        otpLength: 6,
        expirationTime: 5,
        store: memcachedStore,
    });

    const otp = await otpManager.generate("TestUser");
    expect(String(otp)).toHaveLength(6)
    expect(await otpManager.verify("TestUser", otp)).toBe(true);
    await new Promise(resolve => setTimeout(resolve, 10000));
    expect(await otpManager.verify("TestUser", otp)).toBe(false);
})