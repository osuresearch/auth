import { IDriver, ConnectionState, Identity } from '../types';
declare class GraphQLDriver implements IDriver {
    private endpoint;
    constructor(endpoint: string);
    refreshIdentity(): Promise<[ConnectionState, Identity]>;
    emulate(id: string): Promise<void>;
    clearEmulation(): Promise<void>;
}
export default function GraphQL(endpoint?: string): GraphQLDriver;
export {};
//# sourceMappingURL=GraphQL.d.ts.map