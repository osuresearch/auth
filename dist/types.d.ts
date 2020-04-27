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
}
/** Payload from a JSON:API IdM endpoint */
export interface IdentityJsonApiResponse {
    id: string;
    type: string;
    attributes: {
        username: string;
        email: string;
        name: string;
        /**
         * Active application permissions
         */
        permissions: Permission[];
        emulation: {
            active: boolean;
            allowed: boolean;
        };
    };
}
//# sourceMappingURL=types.d.ts.map