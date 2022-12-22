const streamApi = require('../../src/index');

const BrowserLocalStorageKeyStore = streamApi.keyStores.BrowserLocalStorageKeyStore;

describe('Browser keystore', () => {
    let ctx = {};

    beforeAll(async() => {
        ctx.keyStore = new BrowserLocalStorageKeyStore(require('localstorage-memory'));
    });

    require('./keystore_common').shouldStoreAndRetriveKeys(ctx);
});