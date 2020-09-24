import { IDriver, ConnectionState, Identity } from '../types';
/**
 * Driver that communicates with a standard JSON:API backend.
 */
declare class JsonApiDriver implements IDriver {
    private endpoint;
    private emulateEndpoint;
    constructor(endpoint: string, emulateEndpoint: string);
    refreshIdentity(): Promise<[ConnectionState, Identity]>;
    emulate(id: string): Promise<void>;
    clearEmulation(): Promise<void>;
}
export default function JsonApi(endpoint?: string, emulateEndpoint?: string): JsonApiDriver;
export {};
//# sourceMappingURL=JsonApi.d.ts.map