import OTPStore from './otp_store';
import Memcached from 'memcached';

type MemcachedClient = Memcached;

class MemcachedStore extends OTPStore {
    private client: MemcachedClient;

    constructor(client: MemcachedClient) {
        super();
        this.client = client;
    }

    async get(key: string): Promise<number> {
        var value = 0;
        await new Promise<void>((resolve, reject) => {
            this.client.get(key, (err, data) => {
                if (err) {
                    reject();
                }
                value = data;
                resolve();
            });
        });
        return value ?? 0;
    }

    async set(key: string, value: number, ttl = 60): Promise<string | null> {
        await new Promise<void>((resolve, reject) => {
            this.client.set(key, value, ttl, err => {
                if (err) {
                    reject();
                }
                resolve();
            });
        });
        return null;
    }

    async del(key: string): Promise<number | null> {
        await new Promise<void>((resolve, reject) => {
            this.client.del(key, err => {
                if (err) {
                    reject();
                }
                resolve();
            });
        });
        return null;
    }
}

export default MemcachedStore;
