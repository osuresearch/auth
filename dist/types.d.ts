/** Enum representing our current connection to the server. */
export declare enum ConnectionState {
    UNKNOWN = 0,
    /** Connected and still logged in with API server */
    LOGGED_IN = 1,
    /** Can communicate with the API but it is returning an unexpected response */
    API_ERROR = 2,
    /** Cannot communicate with API server at all (including unauthenticated requests) */
    NETWORK_ERROR = 3,
    /** Connected but invalid login session */
    NOT_LOGGED_IN = 4
}
/**
 * Interface for an object that contains one or more attached policies (contextual permissions)
 */
export interface IHasPolicies {
    policies: string[];
}
/**
 * Identity information
 */
export interface Identity {
    /** Unique OSU ID */
    id: string;
    /** Name.# */
    username: string;
    /** Primary email address */
    email: string;
    /** Display name of the user */
    name: string;
    emulation: {
        active: boolean;
        allowed: boolean;
    };
    permissions: string[];
    policies: string[];
}
export declare type DriverResponse = {
    state: ConnectionState;
    user?: Identity;
    error?: string;
};
/**
 * Interface for the translation layer between the backend API and frontend models.
 */
export interface IDriver {
    refreshIdentity(): Promise<DriverResponse>;
    emulate(id: string): Promise<void>;
    clearEmulation(): Promise<void>;
}
//# sourceMappingURL=types.d.ts.map