abstract class OTPStore {
    abstract get(key: string): Promise<number>;

    abstract set(
        key: string,
        value: number,
        ttl?: number
    ): Promise<string | null>;

    abstract del(key: string): Promise<number | null>;
}

export default OTPStore;
