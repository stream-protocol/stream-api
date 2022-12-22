const streamApi = require('../../src/index');

const InMemoryKeyStore = streamApi.keyStores.InMemoryKeyStore;

describe('In-memory keystore', () => {
    let ctx = {};

    beforeAll(async() => {
        ctx.keyStore = new InMemoryKeyStore();
    });

    require('./keystore_common').shouldStoreAndRetriveKeys(ctx);
});