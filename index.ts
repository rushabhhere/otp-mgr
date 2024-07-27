type Generate = (userId: string, purpose: number) => number;
type Verify = (userId: string, purpose: number, enteredOtp: number) => boolean;

class OtpMgr {
  otpMap: Map<string, number> = new Map();

  generate: Generate = (userId, purpose) => {
    const otp: number = Math.floor(1000 + Math.random() * 9000);
    this.otpMap.set(`${userId}:${purpose}`, otp);
    return otp;
  };

  verify: Verify = (userId, purpose, enteredOtp) => {
    const otp = this.otpMap.get(`${userId}:${purpose}`);
    return otp === enteredOtp;
  };
}

module.exports = OtpMgr;
