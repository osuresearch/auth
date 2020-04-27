import { ConnectionState, Identity } from './types';
/**
 * Check our connection state and get updated IdM information, if possible.
 *
 * @return {Promise} Current connection state and updated IdM information, if connected
 */
declare function ping(identityEndpoint: string, publicTestUrl: string): Promise<[ConnectionState, Identity | undefined]>;
export default ping;
//# sourceMappingURL=ping.d.ts.map