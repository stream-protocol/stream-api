/**
 * Connect to STREAM using the provided configuration.
 *
 * {@link ConnectConfig.networkId} and {@link ConnectConfig.nodeUrl} are required.
 *
 * To sign transactions you can also pass:
 * 1. {@link ConnectConfig.keyStore}
 * 2. {@link ConnectConfig.keyPath}
 *
 * If all three are passed they are prioritize in that order.
 *
 * @see {@link ConnectConfig}
 * @example
 * ```js
 * async function initStream() {
 *   const stream = await connect({
 *      networkId: 'testnet',
 *      nodeUrl: 'https://rpc.testnet.streamprotocol.app'
 *   })
 * }
 * ```
 * @module connect
 */
import { readKeyFile } from './key_stores/unencrypted_file_system_keystore';
import { InMemoryKeyStore, MergeKeyStore } from './key_stores';
import { Stream, StreamConfig } from './stream';
import fetch from './utils/setup-node-fetch';
import { logWarning } from './utils';

global.fetch = fetch;

export interface ConnectConfig extends StreamConfig {
    /**
     * Initialize an {@link key_stores/in_memory_key_store!InMemoryKeyStore} by reading the file at keyPath.
     */
    keyPath?: string;
}

/**
 * Initialize connection to Stream network.
 */
export async function connect(config: ConnectConfig): Promise<Stream> {
    // Try to find extra key in `KeyPath` if provided.
    if (config.keyPath && config.keyStore) {
        try {
            const accountKeyFile = await readKeyFile(config.keyPath);
            if (accountKeyFile[0]) {
                // TODO: Only load key if network ID matches
                const keyPair = accountKeyFile[1];
                const keyPathStore = new InMemoryKeyStore();
                await keyPathStore.setKey(config.networkId, accountKeyFile[0], keyPair);
                if (!config.masterAccount) {
                    config.masterAccount = accountKeyFile[0];
                }
                config.keyStore = new MergeKeyStore([
                    keyPathStore,
                    config.keyStore
                ], { writeKeyStoreIndex: 1 });
                if (!process.env['STREAM_NO_LOGS']) {
                    console.log(`Loaded master account ${accountKeyFile[0]} key from ${config.keyPath} with public key = ${keyPair.getPublicKey()}`);
                }
            }
        } catch (error) {
            logWarning(`Failed to load master account key from ${config.keyPath}: ${error}`);
        }
    }
    return new Stream(config);
}
