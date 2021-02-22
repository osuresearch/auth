import { IDriver, DriverResponse } from '../types';
declare class GraphQLDriver implements IDriver {
    private endpoint;
    constructor(endpoint: string);
    /**
     * @throws {Error}              If a network error occurs (such as a CORS error)
     *
     * @returns {DriverResponse}    Response with user information or error information
     *                              if the server's response payload is invalid.
     */
    refreshIdentity(): Promise<DriverResponse>;
    emulate(id: string): Promise<void>;
    clearEmulation(): Promise<void>;
}
export default function GraphQL(endpoint?: string): GraphQLDriver;
export {};
//# sourceMappingURL=GraphQL.d.ts.map