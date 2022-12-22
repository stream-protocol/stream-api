const HELP = `To convert N $STREAM to wSTREAM,  run this script in the following format:

    node wrap-stream.js YOU.stream N

`;

const { connect, keyStores, transactions, utils } = require("stream-wallet-api-js");
const path = require("path");
const homedir = require("os").homedir();

// On mainnet it's wrap.stream, by the way
const WRAP_STREAM_CONTRACT_ID = "wrap.testnet";

const credentialsPath = path.join(homedir, ".stream-credentials");
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.streamprotocol.app",
};

if (process.argv.length !== 4) {
    console.info(HELP);
    process.exit(1);
}

wrapStream(process.argv[2], process.argv[3]);

async function wrapStream(accountId, wrapAmount) {
    const stream = await connect(config);
    const account = await stream.account(accountId);

    const actions = [
        transactions.functionCall(
            "stream_deposit", // contract method to deposit STREAM for wSTREAM
            {},
            30000000000000, // attached gas
            utils.format.parseStreamAmount(wrapAmount) // amount of STREAM to deposit and wrap
        ),
    ];

    // check if storage has been paid (the account has a wSTREAM account)
    const storage = await account.viewFunction({
        contractId: WRAP_STREAM_CONTRACT_ID,
        methodName: "storage_balance_of",
        args: { account_id: accountId },
    });

    // if storage hasn't been paid, pay for storage (create an account)
    if (!storage) {
        actions.unshift(
            transactions.functionCall(
                "storage_deposit", // method to create an account
                {},
                30000000000000, // attached gas
                utils.format.parseStreamAmount('0.00125') // account creation costs 0.00125 STREAM for storage
            )
        );
    }

    // send batched transaction
    return account.signAndSendTransaction({
        receiverId: WRAP_STREAM_CONTRACT_ID,
        actions,
    });
}