const { connect, keyStores, utils } = require("stream-wallet-api-js");
const path = require("path");
const homedir = require("os").homedir();

const WRAP_STREAM_CONTRACT_ID = "wrap.stream";

const credentialsPath = path.join(homedir, ".stream-credentials");
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
    keyStore,
    networkId: "mainnet",
    nodeUrl: "https://rpc.mainnet.streamprotocol.app",
};

// Unwrap 1 wSTREAM to STREAM
unwrapStream("example.stream", "1");

async function unwrapStream(accountId, unwrapAmount) {
    const stream = await connect(config);
    const account = await stream.account(accountId);

    return account.functionCall({
        contractId: WRAP_STREAM_CONTRACT_ID,
        methodName: "stream_withdraw", // method to withdraw wSTREAM for STREAM
        args: { amount: utils.format.parseStreamAmount(unwrapAmount) },
        attachedDeposit: "1", // attach one yoctoSTREAM
    });
}