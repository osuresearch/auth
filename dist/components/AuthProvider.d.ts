import React from 'react';
export interface Props {
    /**
     * API endpoint to use to retrieve current identity information.
     *
     * Defaults to `/api/user` for the current application
     */
    identityEndpoint?: string;
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