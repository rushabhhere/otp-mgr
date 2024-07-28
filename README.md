# OTP Manager

A simple library for managing OTPs for all your applications. It helps with the generation, storage and verification of OTPs.

## Getting Started

### Prerequisites

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes.

### Installing

Requirements:

- Node.js
- NPM (Node.js package manager)

Install with:

```bash
npm install otp-mgr
```

### How To Use

Initialize the OTPManager with the required configuration options:

```javascript
const OTPManager = require("otp-mgr");

// In memory storage
const otpManager = new OTPManager({
  // Configuration options
  purpose: "password-reset", // Purpose of the OTP
  otpLength: 6, // Length of the OTP
  expirationTime: 300, // Time to live in seconds
});
```

Generate an OTP:

```typescript
const otp: number = await otpManager.generateOTP();
```

Verify an OTP:

```typescript
const isValid: boolean = await otpManager.verifyOTP(otp);
```

## All Stores Supported

- In Memory (default)
- [Redis](#Redis)
- [Valkey (same method as redis)](#Redis)
- [Memcached](#Memcached)

### Redis

To use Redis as the store, you need to install the `redis` package:

```bash
npm install redis
```

Then, initialize a new `RedisStore` object and pass it to the `OTPManager`:

```typescript
import { RedisStore } from "@otp-mgr/redis";

const redisClient = createClient({
  url: "redis://<Your Server URL>", // Pass the redis server details
});

redisClient.connect();
const redisStore = new RedisStore(redisClient); // Initialize the store
const otpManager = new OTPManager({
  purpose: "Login",
  otpLength: 6,
  expirationTime: 600,
  store: redisStore, // Pass the store to the OTPManager
});
```

### Memcached

To use Memcached as the store, you need to install the `memcached` package:

```bash
npm install memcached
```

Then, initialize a new `MemcachedStore` object and pass it to the `OTPManager`:

```typescript
import { MemcachedStore } from "@otp-mgr/memcached";
import OTPManager from "otp-manager";

const memcachedClient = new Memcached(["<Your Server URL>"]); // Pass the memcached server details

const memcachedStore = new MemcachedStore(memcachedClient); // Initialize the store

const otpManager = new OTPManager({
  purpose: "Login",
  otpLength: 6,
  expirationTime: 600,
  store: memcachedStore, // Pass the store to the OTPManager
});
```

## Building your own store

You can build your own store by extending the `OTPStore` abstract class:

```typescript
abstract class OTPStore {
  abstract get(key: string): Promise<number>;

  abstract set(
    key: string,
    value: number,
    ttl?: number
  ): Promise<string | null>;

  abstract del(key: string): Promise<number | null>;
}
```

## Versioning

We use [Semantic Versioning](http://semver.org/) for versioning.

## Authors

- **Rushabh Javeri** - [GitHub](https://github.com/rushabhhere)
- **Manan Gandhi** - [GitHub](https://github.com/MananGandhi1810)

## License

This project is licensed under the [MIT License](https://license.md/licenses/mit-license/)
