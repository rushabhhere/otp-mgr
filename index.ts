import crypto from 'node:crypto';
import OTPStore from './utils/store_template';
import MapStore from './stores/map_store';

interface Config {
  purpose: string | number;
  otpLength?: 4 | 5 | 6 | 7 | 8;
  expirationTime: number;
  store?: OTPStore;
}

type UserId = string | number;

type GenerateFunction = (userId: UserId) => Promise<number>;
type VerifyFunction = (userId: UserId, enteredOtp: number) => Promise<boolean>;

class OTPManager {
  private store: OTPStore;

  constructor(private _config: Config) {
    this._config.otpLength = this._config.otpLength ?? 6;
    this.store = _config.store ?? new MapStore();
  }

  // private _otpMap = new Map<string, [number, Date]>();

  public generate: GenerateFunction = async userId => {
    const otpLength = this._config.otpLength as number;

    const otp = crypto.randomInt(
      Math.pow(10, otpLength - 1),
      Math.pow(10, otpLength)
    );

    await this.store.set(
      `${this._config.purpose}:${userId}`,
      otp,
      this._config.expirationTime
    );

    return otp;
  };

  public verify: VerifyFunction = async (userId, enteredOtp) => {
    const otp = await this.store.get(`${this._config.purpose}:${userId}`);

    if (!otp) return false;

    if (otp === enteredOtp) {
      this.store.del(`${this._config.purpose}:${userId}`);
      return true;
    }

    return false;
  };
}

export default OTPManager;
