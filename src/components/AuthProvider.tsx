
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AuthContext, { AuthContextState } from '../context/AuthContext';
import { Identity, ConnectionState, IDriver } from '../types';
import ping from '../internal/ping';
import { DEFAULT_SSO_LOGOUT_URL } from '../internal/utility';
import LoggingIn from './LoggingIn';
import LoggedOut from './LoggedOut';
import NetworkError from './NetworkError';
import ApiError from './ApiError';

export interface Props {
    /**
     * Driver class type used for translating identity refresh requests from the backend
     */
    driver: IDriver

    /**
     * Resource URL on the same host to send a HEAD request to IFF
     * the identity endpoint cannot connect. This allows us narrow
     * down the problem to either an authentication error or
     * a network error.
     */
    publicTestUrl?: string

    /**
     * Authentication logout url to redirect the user on logout.
     *
     * Defaults to the Shibboleth SSO logout URL.
     */
    logoutUrl?: string

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
};

/** How frequent to ping the identity endpoint for an update while logged in */
const DEFAULT_PING_INTERVAL = 300 * 1000; // 5 minutes

/** How frequent to ping the identity endpoint for an update while NOT logged in */
const ACTIVE_PING_INTERVAL = 5000; // 5 seconds

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
    driver,
    publicTestUrl = '/assets/img/osu-footer-wordmark.png',
    logoutUrl = DEFAULT_SSO_LOGOUT_URL,
    requireAuthentication = true
}) => {
    const [user, setUser] = useState<Identity>();
    const [state, setState] = useState<ConnectionState>(ConnectionState.UNKNOWN);
    const [error, setError] = useState<string>();

    // Track an active verifyLogin promise so that we do not duplicate promises
    // if multiple components are asynchronously requesting updates at the same time
    const [promiseRef, setPromiseRef] = useState<Promise<any>>();

    // Resolver function for the verifyLogin promise. Tracked in state so
    // it can be called externally once needed.
    const [, setResolver] = useState<VerifyLoginResolver>();

    // Local poll interval. Will adjust dynamically when verifying login
    const [pingInterval, setPingInterval] = useState(DEFAULT_PING_INTERVAL);

    // Track whether a ping is currently in progress
    const [, setPingActive] = useState(false);

    /**
     * Refresh our connection state and user information from the API
     */
    const refresh = useCallback(() => {
        console.debug('[AuthProvider:refresh] Refresh');

        setPingActive(prev => {
            // Skip if we're mid-ping
            if (prev) return prev;

            ping(driver, publicTestUrl)
                .then((res) => {
                    console.debug('[AuthProvider:ping] Resolve', res);

                    // Update states with response payloads
                    setState(res.state);
                    setError(res.error);
                    setUser((prev) => {
                        // Since user is an object, we use a deep comparison
                        // to determine if it has actually changed since last time.
                        // This helps us avoid changing state when there are no data changes.
                        if (JSON.stringify(prev) === JSON.stringify(res.user)) {
                            console.debug('using previous user');
                            return prev;
                        }
                        console.debug('replacing user');
                        return res.user;
                    });

                    if (res.state === ConnectionState.LOGGED_IN) {
                        setPromiseRef(undefined);
                        setResolver((prev) => {
                            // If there was a resolver stored, execute and clear.
                            if (typeof prev !== 'undefined') {
                                console.debug('[AuthProvider:ping] Execute previous resolver', prev);
                                prev();
                            }

                            return undefined;
                        });

                        // Reset ping interval to our default settings
                        setPingInterval(DEFAULT_PING_INTERVAL);
                    }

                    setPingActive(false);
                }
            );

            return true;
        });
    }, [driver, publicTestUrl]);

    // Refresh connection information immediately on mount
    useEffect(() => {
        refresh();
    }, [refresh]);

    // Refresh connection information on an interval.
    useEffect(() => {
        console.debug('[AuthProvider] Update interval to', pingInterval);
        const handle = setInterval(refresh, pingInterval);
        return () => clearInterval(handle);
    }, [pingInterval, refresh]);

    // Memoized context off of the user/state/error information.
    const context = useMemo<AuthContextState>(() => {
        console.debug('[AuthProvider] Re-memoizing context');
        return {
            user,
            state,
            error,
            permissions: user?.permissions || [],
            can: (action, on) => {
                if (typeof on !== 'undefined') {
                    return on.policies.indexOf(action) >= 0;
                }

                return user ? user.permissions.indexOf(action) >= 0 : false;
            },
            logout: () => {
                setUser(undefined);
                setState(ConnectionState.NOT_LOGGED_IN);
                setError(undefined);
                window.location.href = logoutUrl;
            },
            verifyLogin: async () => {
                // Deduplicate promises
                if (typeof promiseRef !== 'undefined') {
                    console.debug('[AuthProvider:verifyLogin] Return pending resolver', promiseRef);
                    return promiseRef;
                }

                const promise = new Promise<void>((resolve) => {
                    console.debug('[AuthProvider:verifyLogin] Setting new resolver', resolve);

                    setPingInterval(ACTIVE_PING_INTERVAL);

                    // The call is wrapped with a lambda because we can't just call setResolver(resolve)
                    // React will assume `resolve` is a callable that gets passed in the previous
                    // value and returns the new value. Which is incorrect usage here.
                    setResolver(() => resolve);
                });

                console.debug('[AuthProvider:verifyLogin] Set refresh promise', promise);
                setPromiseRef(promise);
                refresh();

                return promise;
            },
            emulate: driver.emulate.bind(driver),
            clearEmulation: driver.clearEmulation.bind(driver),
        }
    }, [user, state, error, logoutUrl, driver, promiseRef, refresh]);

    const canShowAppContent =
        (state === ConnectionState.LOGGED_IN) ||
        (!requireAuthentication && (
            state == ConnectionState.NOT_LOGGED_IN ||
            state === ConnectionState.UNKNOWN
        ));

    return (
        <AuthContext.Provider value={context}>
            {(state === ConnectionState.UNKNOWN && requireAuthentication) &&
                <LoggingIn />
            }
            {(state === ConnectionState.NOT_LOGGED_IN && requireAuthentication) &&
                <LoggedOut />
            }
            {state === ConnectionState.API_ERROR &&
                <ApiError error={error} />
            }
            {state === ConnectionState.NETWORK_ERROR &&
                <NetworkError />
            }
            {canShowAppContent && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
