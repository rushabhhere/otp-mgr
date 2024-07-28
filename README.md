# OTP Manager

A simple library for managing OTPs for all your applications. It helps with the generation, storage and verification of OTPs.

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes.

### Installing

Requirements:

- Node.js
- NPM (Node.js package manager)

Install with:

    npm install otp-mgr

### How To Use

Basic Usage:

```javascript
const OTPManager = require("otp-mgr");

const otpMgr = new OTPManager({
  // Configuration options
  // Default values are shown below
  purpose: "password-reset", // Purpose of the OTP
  otpLength: 6, // Length of the OTP
  expirationTime: 300, // Time to live in seconds
});
```

## Versioning

We use [Semantic Versioning](http://semver.org/) for versioning.

## Authors

- **Rushabh Javeri** - [GitHub](https://github.com/rushabhhere)
- **Manan Gandhi** - [GitHub](https://github.com/MananGandhi1810)

## License

This project is licensed under the [MIT License](https://license.md/licenses/mit-license/)
