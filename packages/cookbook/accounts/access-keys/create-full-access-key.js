const { KeyPair, keyStores, connect } = require("stream-wallet-api-js");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".stream-credentials";
const ACCOUNT_ID = "example.testnet";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.streamprotocol.app",
};

createFullAccessKey(ACCOUNT_ID);

async function createFullAccessKey(accountId) {
    const keyPair = KeyPair.fromRandom("ed25519");
    const publicKey = keyPair.publicKey.toString();
    const stream = await connect(config);
    const account = await stream.account(accountId);
    await keyStore.setKey(config.networkId, publicKey, keyPair);
    await account.addKey(publicKey);
}