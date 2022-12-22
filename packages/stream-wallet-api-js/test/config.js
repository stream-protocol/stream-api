module.exports = function getConfig(env) {
    switch (env) {
        case 'production':
        case 'mainnet':
            return {
                networkId: 'mainnet',
                nodeUrl: 'https://rpc.mainnet.streamprotocol.app',
                walletUrl: 'https://wallet.streamprotocol.app',
                helperUrl: 'https://helper.mainnet.streamprotocol.app',
            };
        case 'development':
        case 'testnet':
            return {
                networkId: 'default',
                nodeUrl: 'https://rpc.testnet.streamprotocol.app',
                walletUrl: 'https://wallet.testnet.streamprotocol.app',
                helperUrl: 'https://helper.testnet.streamprotocol.app',
                masterAccount: 'test.stream',
            };
        case 'betanet':
            return {
                networkId: 'betanet',
                nodeUrl: 'https://rpc.betanet.streamprotocol.app',
                walletUrl: 'https://wallet.betanet.streamprotocol.app',
                helperUrl: 'https://helper.betanet.streamprotocol.app',
            };
        case 'local':
            return {
                networkId: 'local',
                nodeUrl: 'http://localhost:3030',
                keyPath: `${process.env.HOME}/.stream/validator_key.json`,
                walletUrl: 'http://localhost:4000/wallet',
            };
        case 'test':
        case 'ci':
            return {
                networkId: 'shared-test',
                nodeUrl: 'https://rpc.ci-testnet.streamprotocol.app',
                masterAccount: 'test.stream',
            };
        default:
            throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
    }
};