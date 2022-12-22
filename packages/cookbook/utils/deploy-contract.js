const { keyStores, connect } = require("stream-wallet-api-js");
const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".stream-credentials";
const ACCOUNT_ID = "stream-example.testnet";
const WASM_PATH = path.join(__dirname, "/wasm-files/status_message.wasm");
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.streamprotocol.app",
};

deployContract(ACCOUNT_ID, WASM_PATH);

async function deployContract(accountId, wasmPath) {
    const stream = await connect(config);
    const account = await stream.account(accountId);
    const result = await account.deployContract(fs.readFileSync(wasmPath));
    console.log(result);
}