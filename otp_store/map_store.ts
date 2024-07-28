import OTPStore from './otp_store';

class MapStore extends OTPStore {
  private _otpMap: Map<string, [number, Date]>;

  constructor() {
    super();
    this._otpMap = new Map<string, [number, Date]>();
  }

  async get(key: string): Promise<number> {
    return (this._otpMap.get(key) ?? [0])[0];
  }

  async set(key: string, value: number, ttl?: number): Promise<string | null> {
    try {
      this._otpMap.set(key, [value, new Date(Date.now() + (ttl ?? 0))]);

      setTimeout(() => {
        this.del(key);
      }, (ttl ?? 60) * 1000);
      return 'OK';
    } catch (e) {
      return String(e);
    }
  }

  async del(key: string): Promise<number | null> {
    try {
      this._otpMap.delete(key);
      return 1;
    } catch (e) {
      return -1;
    }
  }
}

export default MapStore;
