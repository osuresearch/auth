
/** Enum representing our current connection to the server. */
export enum ConnectionState {
    UNKNOWN,

    /** Connected and still logged in with API server */
    LOGGED_IN,

    /** Can communicate with the API but it is returning an unexpected response */
    API_ERROR,

    /** Cannot communicate with API server at all (including unauthenticated requests) */
    NETWORK_ERROR,

    /** Connected but invalid login session */
    NOT_LOGGED_IN
};

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
    }

    permissions: string[];
};

export type DriverResponse = {
    state: ConnectionState
    user?: Identity
    error?: string
}

/**
 * Interface for the translation layer between the backend API and frontend models.
 */
export interface IDriver {
    refreshIdentity(): Promise<DriverResponse>;
    emulate(id: string): Promise<void>;
    clearEmulation(): Promise<void>;
};
