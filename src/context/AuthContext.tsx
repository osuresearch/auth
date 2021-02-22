
import { createContext } from 'react';
import { IHasPolicies } from '..';
import { Identity, ConnectionState } from '../types';

export interface AuthContextState {
    /**
     * Identity information from the API
     */
    user: Identity

    /**
     * Current connection state to the API
     */
    state: ConnectionState

    /**
     * Additional error information when state is NETWORK_ERROR or API_ERROR
     */
    error?: string

    /**
     * Application permissions associated with the user
     */
    permissions: string[]

    /**
     * Can the user perform the given action (permission).
     *
     * If `on` is provided - the action will be tested against the
     * policies of the instance. Otherwise, it is tested against
     * the user's current permissions.
     */
    can: (action: string, on?: IHasPolicies) => boolean;

    /**
     * Remove the user's identity information and forward the
     * application to the authentication provider's logout URL.
     */
    logout(): void

    /**
     * Promise that doesn't resolve until the user has been logged back in
     * (state == ConnectionState.LOGGED_IN)
     *
     * If there's a verifyLogin already waiting in the app, the same promise will
     * be returned. While a verifyLogin promise is active, the ping interval will
     * be increased to every 5 seconds until successful.
     */
    verifyLogin(): Promise<any>

    emulate(id: string): Promise<any>
    clearEmulation(): Promise<any>

};

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export default AuthContext;
