import { KeyStore } from './keystore';
import { KeyPair } from '../utils/key_pair';

/**
 * Simple in-memory keystore for mainly for testing purposes.
 * 
 * @see [https://docs.streamprotocol.app/docs/develop/front-end/naj-quick-reference#key-store](https://docs.streamprotocol.app/docs/develop/front-end/naj-quick-reference#key-store)
 * @example
 * ```js
 * import { connect, keyStores, utils } from 'stream-wallet-api-js';
 * 
 * const privateKey = '.......';
 * const keyPair = utils.KeyPair.fromString(privateKey);
 * 
 * const keyStore = new keyStores.InMemoryKeyStore();
 * keyStore.setKey('testnet', 'example-account.testnet', keyPair);
 * 
 * const config = { 
 *   keyStore, // instance of InMemoryKeyStore
 *   networkId: 'testnet',
 *   nodeUrl: 'https://rpc.testnet.streamprotocol.app',
 *   walletUrl: 'https://wallet.testnet.streamprotocol.app',
 *   helperUrl: 'https://helper.testnet.streamprotocol.app',
 *   explorerUrl: 'https://explorer.testnet.streamprotocol.app'
 * };
 * 
 * // inside an async function
 * const stream = await connect(config)
 * ```
 */
export class InMemoryKeyStore extends KeyStore {
    /** @hidden */
    private keys: { [key: string]: string };

    constructor() {
        super();
        this.keys = {};
    }

    /**
     * Stores a {@link utils/key_pair!KeyPair} in in-memory storage item
     * @param networkId The targeted network. (ex. default, betanet, etc…)
     * @param accountId The STREAM account tied to the key pair
     * @param keyPair The key pair to store in local storage
     */    
    async setKey(networkId: string, accountId: string, keyPair: KeyPair): Promise<void> {
        this.keys[`${accountId}:${networkId}`] = keyPair.toString();
    }

    /**
     * Gets a {@link utils/key_pair!KeyPair} from in-memory storage
     * @param networkId The targeted network. (ex. default, betanet, etc…)
     * @param accountId The STREAM account tied to the key pair
     * @returns {Promise<KeyPair>}
     */
    async getKey(networkId: string, accountId: string): Promise<KeyPair> {
        const value = this.keys[`${accountId}:${networkId}`];
        if (!value) {
            return null;
        }
        return KeyPair.fromString(value);
    }

    /**
     * Removes a {@link utils/key_pair!KeyPair} from in-memory storage
     * @param networkId The targeted network. (ex. default, betanet, etc…)
     * @param accountId The STREAM account tied to the key pair
     */
    async removeKey(networkId: string, accountId: string): Promise<void> {
        delete this.keys[`${accountId}:${networkId}`];
    }

    /**
     * Removes all {@link utils/key_pair!KeyPair} from in-memory storage
     */
    async clear(): Promise<void> {
        this.keys = {};
    }

    /**
     * Get the network(s) from in-memory storage
     * @returns {Promise<string[]>}
     */
    async getNetworks(): Promise<string[]> {
        const result = new Set<string>();
        Object.keys(this.keys).forEach((key) => {
            const parts = key.split(':');
            result.add(parts[1]);
        });
        return Array.from(result.values());
    }

    /**
     * Gets the account(s) from in-memory storage
     * @param networkId The targeted network. (ex. default, betanet, etc…)
     */
    async getAccounts(networkId: string): Promise<string[]> {
        const result = new Array<string>();
        Object.keys(this.keys).forEach((key) => {
            const parts = key.split(':');
            if (parts[parts.length - 1] === networkId) {
                result.push(parts.slice(0, parts.length - 1).join(':'));
            }
        });
        return result;
    }

    /** @hidden */
    toString(): string {
        return 'InMemoryKeyStore';
    }
}
