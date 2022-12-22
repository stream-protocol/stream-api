# STREAM JavaScript API Cookbook

Collection of common use cases for [`stream-wallet-api-js`](https://github.com/stream-protocol/stream-wallet-api-js).

|                                                                 |                                                                                                                  |
|-----------------------------------------------------------------| ---------------------------------------------------------------------------------------------------------------- |
| **ACCOUNTS**                                                    |                                                                                                                  |
| [Create Account](./accounts/create-testnet-account.js)          | Create [STREAM accounts](https://docs.streamprotocol.app/concepts/basics/account) without using STREAM Wallet.                   |
| [Access Key Rotation](./accounts/access-keys/README.md)         | Create and delete [access keys](https://docs.streamprotocol.app/concepts/basics/account#access-keys) for added security.     |
| **TRANSACTIONS**                                                |                                                                                                                  |
| [Get Transaction Status](./transactions/get-tx-status.js)       | Gets transaction status using a tx hash and associated account/contract ID.                                      |
| [Recent Transaction Details](./transactions/get-tx-detail.js)   | Get recent transaction details without using an [indexing](https://docs.streamprotocol.app/docs/concepts/indexer) service. |
| [Batch Transactions](./transactions/batch-transactions.js)      | Sign and send multiple [transactions](https://docs.streamprotocol.app/docs/concepts/transaction).                          |
| **UTILS**                                                       |                                                                                                                  |
| [Deploy Contract](./utils/deploy-contract.js)                   | Deploys a contract using a pre-compiled .wasm file                                                               |
| [Calculate Gas](./utils/calculate-gas.js)                       | Calculate [gas burnt](https://docs.streamprotocol.app/docs/concepts/gas) from any contract call.                           |
| [Read State w/o Account](./utils/get-state.js)                  | Read state of a contract without instantiating an account.                                                       |
| [Wrap](./utils/wrap-stream.js) & [Unwrap](./utils/unwrap-stream.js)  STREAM | Wrap and unwrap STREAM using the `wrap.stream` smart contract.                                                  |
| [Verify Signature](./utils/verify-signature.js)                 | Verify a key pair signature.                                                                                |

## Requirements

-   [STREAM Account](https://docs.streamprotocol.app/docs/develop/basics/create-account)
-   [Node.js](https://nodejs.org/en/download/package-manager/)
-   [pnpm](https://pnpm.io/installation)

## Setup

1. Install dependencies

```bash
pnpm install
```

2. Navigate to the cookbook directory

```bash
cd packages/cookbook
```

3. Run Commands

Example:

```bash
node utils/get-state
```
