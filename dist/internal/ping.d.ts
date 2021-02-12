import { DriverResponse, IDriver } from '../types';
/**
 * Check our connection state and get updated IdM information, if possible.
 *
 * @return {Promise} Current connection state and updated IdM information, if connected
 */
declare function ping(driver: IDriver, publicTestUrl: string): Promise<DriverResponse>;
export default ping;
//# sourceMappingURL=ping.d.ts.map