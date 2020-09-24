/** Enum representing our current connection to the server. */
export declare enum ConnectionState {
    UNKNOWN = 0,
    /** Connected and still logged in with API server */
    LOGGED_IN = 1,
    /** Cannot communicate with API server at all */
    NETWORK_ERROR = 2,
    /** Connected but invalid login session */
    NOT_LOGGED_IN = 3
}
export declare type Permission = string;
export declare type Policy = string;
/**
 * Interface for an object that contains one or more attached policies
 */
export interface IHasPolicies {
    policies: Policy[];
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
    permissions: Permission[];
    policies: Policy[];
}
/**
 * Interface for the translation layer between the backend API and frontend models.
 */
export interface IDriver {
    refreshIdentity(): Promise<[ConnectionState, Identity | undefined]>;
    emulate(id: string): Promise<void>;
    clearEmulation(): Promise<void>;
}
//# sourceMappingURL=types.d.ts.map