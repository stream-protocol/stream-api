const streamApi = require('../src/index');

test('test no key', async() => {
    const signer = new streamApi.InMemorySigner(new streamApi.keyStores.InMemoryKeyStore());
    await expect(signer.signMessage('message', 'user', 'network')).rejects.toThrow(/Key for user not found in network/);
});