/**
 * Connect to Stream using the provided configuration.
 *
 * {@link ConnectConfig.networkId} and {@link ConnectConfig.nodeUrl} are required.
 *
 * To sign transactions you can also pass: {@link ConnectConfig.keyStore}
 *
 * Both are passed they are prioritize in that order.
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
 *
 * @module browserConnect
 */
import { Stream, StreamConfig } from './stream';

export interface ConnectConfig extends StreamConfig {
    /** @hidden */
    keyPath?: string;
}

/**
 * Initialize connection to Stream network.
 */
export async function connect(config: ConnectConfig): Promise<Stream> {
    return new Stream(config);
}
