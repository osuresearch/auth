
/** Enum representing our current connection to the server. */
export enum ConnectionState {
    UNKNOWN,
    
    /** Connected and still logged in with API server */
    LOGGED_IN,

    /** Cannot communicate with API server at all */
    NETWORK_ERROR,

    /** Connected but invalid login session */
    NOT_LOGGED_IN
};

export type Permission = string;

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

    permissions: Permission[];
};

/**
 * Interface for the translation layer between the backend API and frontend models.
 */
export interface ApiAdapter {
    refreshIdentity(): Promise<[ConnectionState, Identity|undefined]>;
};
