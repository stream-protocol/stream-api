# Stream Protocol JavaScript API

[![Build Status](https://travis-ci.com/stream-protocol/stream-wallet-api-js.svg?branch=master)](https://travis-ci.com/stream-protocol/stream-wallet-api-js)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/stream-protocol/stream-wallet-api-js) 

Stream Protocol JavaScript API is a complete library to interact with the Stream blockchain. You can use it in the browser, or in Node.js runtime.

## Documentation

- [Learn how to use](https://docs.streamprotocol.app/tools/stream-wallet-api-js/quick-reference) the library in your project

- Read the [TypeDoc API](https://stream-protocol.github.io/stream-wallet-api-js//) documentation

- [Cookbook](./packages/cookbook) with common use cases

- To quickly get started with integrating Stream Wallet in a _web browser_, read our [Web Frontend integration](https://docs.streamprotocol.app/develop/integrate/frontend) article.

## Contribute to this library

1. Install dependencies

       pnpm install

2. Run continuous build with:

       pnpm -r compile -w


### Publish

Prepare `dist` version by running:

    pnpm dist

### Integration Test

Start the node by following instructions from [stream-core](https://github.com/stream-protocol/stream-core), then

    pnpm test

Tests use sample contract from `stream-hello` npm package, see https://github.com/streamprotocol/stream-hello

### Update error schema

Follow next steps:

1. [Change hash for the commit with errors in the stream-core](https://github.com/stream-protocol/stream-wallet-api-js/blob/master/fetch_error_schema.js#L8-L9)
2. Fetch new schema: `node fetch_error_schema.js`
3. `pnpm build` to update `lib/**.js` files

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
See [LICENSE](LICENSE) and [LICENSE-APACHE](LICENSE-APACHE) for details.
