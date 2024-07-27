abstract class OTPStore {
    constructor(private client: any) {
        this.client = client;
    }

    abstract get(key: string): Promise<number>;
    abstract set(key: string, value: number, ttl?: number): Promise<string | null>;
    abstract del(key: string): Promise<string | null>;
}