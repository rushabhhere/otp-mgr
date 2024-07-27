import { expect, test } from 'vitest'
import OTPManager from '..'

test('Test OTP Manager with default Map store', async () => {
    const otpManager = new OTPManager({
        purpose: "Login",
        otpLength: 6,
        expirationTime: 60,
    });

    const otp = otpManager.generate("TestUser");
    expect(otpManager.verify("TestUser", otp)).toBe(true);
})