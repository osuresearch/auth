import React from 'react';
import { IDriver } from '../types';
export interface Props {
    /**
     * Driver class type used for translating identity refresh requests from the backend
     */
    driver: IDriver;
    /**
     * Resource URL on the same host to send a HEAD request to IFF
     * the identity endpoint cannot connect. This allows us narrow
     * down the problem to either an authentication error or
     * a network error.
     */
    publicTestUrl?: string;
    /**
     * Authentication logout url to redirect the user on logout.
     *
     * Defaults to the Shibboleth SSO logout URL.
     */
    logoutUrl?: string;
    /**
     * Should the authentication service replace the application content
     * with a "you have been logged out" screen when the user's session
     * has timed out (e.g. via a Shibboleth timeout).
     *
     * Defaults to true. If set to false, the application must be able
     * to handle situations where `user` and `permissions` from the
     * `useIdentity()` hook is null - as well as any failures that may
     * occur when an invalid Shibboleth session is accessing backend APIs
     * as, in the case of a Shibboleth timeout, these will all fail.
     *
     * Unless you really know what you're doing - it is strongly
     * recommended that you keep this on.
     */
    requireAuthentication?: boolean;
}
/**
 * Primary provider for authentication information for an application.
 *
 * This periodically pings an identity API endpoint for updated login information.
 * If the session has expired or the network connection is lost, this hook will
 * emit updated connection state information for other components to react to.
 */
declare const AuthProvider: React.FC<Props>;
export default AuthProvider;
//# sourceMappingURL=AuthProvider.d.ts.map