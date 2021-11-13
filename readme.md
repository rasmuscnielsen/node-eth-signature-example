# Generate Ethereum signature in NodeJS

This repository contains sample code for how to

- Generate a personal signature given a private key
- Verify that same signature in solidity on the Ethereum blockchain

## Install this demo locally

1. Clone this repository
2. Run `npm install`

## How to use

### 1. Generate new keypair

Run script:

```bash
node generate-keys.js
```

Sample output:

```bash
{
    privateKey: '92fb2fbfc7ffc66baf1261b4a9844725e63fad769378902b9cb32241b879c8c0',
    publicKey: '04e884ae50278cc451a6694e95a200324fa70d1590be3b5849ef066150a8be162c0b76505b7fe2a0d528e39b6cc13f92822572dd0621d31b3a09df79448b0df841',
    address: '0x957a3e51767a62c3EEE0b3dA6ab524FfEF5Fc04f'
}
```

### 2. Sign a message

Run script with private key:

```bash
node index.js 92fb2fbfc7ffc66baf1261b4a9844725e63fad769378902b9cb32241b879c8c0
```

Output:

```bash
{
    message: 'a1de988600a42c4b4ab089b619297c17d53cffae5d5120d82d8a92d0bb3b78f2',
    signature: {
        v: '1b',
        r: 'ca973c0ebcdfabd0b9206e999b037c36538e8457ea5d3098e8129f0ff982c4b6',
        s: '2b397511bf128f4740ef4c906b493a6c3f7252c68036f5882c982f16e99e694f'
    }
}
```

### 3. Verify signature in solidity (on remix)

Head over to https://remix.ethereum.org and create a new contract with the following contents.

```
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract VerifySignature {
    function recoverAddr(bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) public returns (address) {
        return ecrecover(msgHash, v, r, s);
    }
}
```

Deploy the contract, and execute the `recoverAddr` with the values retrieved from `index.js`.

**Important:** All values must be prepended with `0x`:

![Remix screenshot](https://user-images.githubusercontent.com/8465957/141650711-1fd391e3-efe7-4932-b14f-32e8b0561cf8.png)

Debugging the output, we should see the following:

```
decoded output {
    "0": "address: 0x957a3e51767a62c3EEE0b3dA6ab524FfEF5Fc04f"
}
```

Since this matches the public key given by the generation script, we have successfully verified the signature is valid.