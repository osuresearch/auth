
import React, { useState, useEffect, useCallback } from 'react';
import AuthContext, { AuthContextState } from '../context/AuthContext';
import { Identity, ConnectionState } from '../types';
import ping from '../internal/ping';
import { basepath } from '../internal/utility';

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
};

/** How frequent to ping the identity endpoint for an update while logged in */
const DEFAULT_PING_INTERVAL = 300 * 1000; // 5 minutes

/** How frequent to ping the identity endpoint for an update while NOT logged in */
const ACTIVE_PING_INTERVAL = 5000; // 5 seconds

/** Default URL for Shibboleth SSO logouts. May be overridden in the AuthProvider */
const DEFAULT_SSO_LOGOUT_URL = '/Shibboleth.sso/Logout?return=https://webauth.service.ohio-state.edu/idp/profile/Logout';

/** Safe typing for setResolver() */
type VerifyLoginResolver = () => void;

/**
 * Primary provider for authentication information for an application.
 * 
 * This periodically pings an identity API endpoint for updated login information.
 * If the session has expired or the network connection is lost, this hook will
 * emit updated connection state information for other components to react to. 
 */
const AuthProvider: React.FC<Props> = ({ 
    children,
    identityEndpoint = `${basepath()}/api/user`,
    publicTestUrl = '/assets/img/osu-footer-wordmark.png',
    logoutUrl = DEFAULT_SSO_LOGOUT_URL
}) => {
    // Current connection state to the API
    const [state, setState] = useState<ConnectionState>(ConnectionState.UNKNOWN);

    // Identity information from the API
    const [user, setUser] = useState<Identity>();

    // Track an active verifyLogin promise so that we do not duplicate promises
    // if multiple components are asynchronously requesting updates at the same time
    const [promiseRef, setPromiseRef] = useState<Promise<any>>();

    // Resolver function for the verifyLogin promise. Tracked in state so 
    // it can be called externally once needed.
    const [, setResolver] = useState<(VerifyLoginResolver)>();

    // Local poll interval. Will adjust dynamically when verifying login
    const [pingInterval, setPingInterval] = useState<number>(DEFAULT_PING_INTERVAL);

    // Track whether a ping is currently in progress
    const [, setPingActive] = useState(false);

    const resolvePingResponse = useCallback((res: [ConnectionState, Identity | undefined]) => {
        console.debug('[AuthProvider:resolvePingResponse] Resolve ping to state', res[0]);

        // Update states with response payloads
        setState(res[0]);
        setUser(res[1]);
        setPingActive(false);

        if (res[0] === ConnectionState.LOGGED_IN) {
            setPromiseRef(undefined);
            setResolver((prev) => {
                // If there was a resolver stored, execute and clear.
                if (typeof prev !== 'undefined') {
                    console.debug('[AuthProvider:resolvePingResponse] Execute previous resolver', prev);
                    prev();
                }

                return undefined;
            });
            
            // Reset ping interval to our default settings
            setPingInterval(DEFAULT_PING_INTERVAL);
        }
    }, []);

    // Trigger a refresh of our connection state
    const refresh = useCallback(() => {
        console.debug('[AuthProvider:refresh] Refresh');

        setPingActive(prev => {
            if (prev) return prev;

            ping(identityEndpoint, publicTestUrl)
                .then(resolvePingResponse);

            return true;
        });
    }, [identityEndpoint, publicTestUrl, resolvePingResponse]);

    // Refresh connection information immediately on mount
    useEffect(() => {
        refresh();
    }, [refresh]);

    // Refresh connection information on an interval. 
    // This is split from the refresh on mount hook because I don't want
    // to trigger an immediate refresh every time `pingInterval` is modified.
    useEffect(() => {
        console.debug('[AuthProvider] Update interval to', pingInterval);
        const handle = setInterval(refresh, pingInterval);
        return () => clearInterval(handle);
    }, [pingInterval, refresh]);

    /**
     * Promise that doesn't resolve until we verify that the user is logged back in.
     * 
     * If there's a verifyLogin already waiting in the app, the same promise will
     * be returned. While a verifyLogin promise is active, the ping interval will 
     * be increased to every 5 seconds until login is complete.
     */
    const verifyLogin = useCallback(async () => {
        // Deduplicate promises
        if (typeof promiseRef !== 'undefined') {
            console.debug('[AuthProvider:verifyLogin] Return pending resolver', promiseRef);
            return promiseRef;
        }

        const promise = new Promise<void>((resolve, reject) => {
            console.debug('[AuthProvider:verifyLogin] Setting new resolver', resolve);

            setPingInterval(ACTIVE_PING_INTERVAL);

            // The call is wrapped with a lambda because we can't just call setResolver(resolve)
            // React will assume `resolve` is a callable that gets passed in the previous 
            // value and returns the new value. Which is incorrect usage here.
            // TODO: Can't I just do setResolver(() => resolve) ? 
            setResolver(() => resolve);
        });

        console.debug('[AuthProvider:verifyLogin] Set refresh promise', promise);
        setPromiseRef(promise);
        refresh();
        
        return promise;
    }, [promiseRef, refresh]);

    /**
     * Remove the user's identity information and forward the application 
     * to an authentication logout URL.
     */
    const logout = () => {
        setUser(undefined);
        setState(ConnectionState.NOT_LOGGED_IN);
        window.location.href = logoutUrl;
    };

    const context: AuthContextState = {
        user,
        verifyLogin,
        logout,
        state
    };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
