const otpMap = new Map();

function generate(userId: string, purpose: number): number {
  const otp = Math.floor(1000 + Math.random() * 9000);
  otpMap.set(`${userId}:${purpose}`, otp);
  return otp;
}

function verify(userId: string, purpose: number, enteredOtp: number): boolean {
  const otp = otpMap.get(`${userId}:${purpose}`);
  return otp === enteredOtp;
}

// export the functions
export { generate, verify };
