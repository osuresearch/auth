
import { ConnectionState, DriverResponse, IDriver } from '../types';

/**
 * Check our connection state and get updated IdM information, if possible.
 *
 * @return {Promise} Current connection state and updated IdM information, if connected
 */
async function ping(driver: IDriver, publicTestUrl: string): Promise<DriverResponse> {
    try {
        console.debug('[ping] Refresh');
        const result = await driver.refreshIdentity();
        return result;
    } catch (e) {
        // Potential network error - fall through to doing a more conclusive test.
        console.error('[ping] Driver error:', e);
    }

    try {
        console.debug('[ping] HEAD', publicTestUrl);

        // If a 200 response from the public url (or even a 404),
        // the server is still reachable, we're just getting network errors from auth
        // (thus potentially a CORS error against our authentication provider)
        await fetch(publicTestUrl, {
            method: 'HEAD',
            cache: 'no-cache',
            redirect: 'follow',
            credentials: 'same-origin'
        });

        return {
            state: ConnectionState.NOT_LOGGED_IN,
            user: undefined,
            error: 'Could not retrieve user information - session may have been expired.'
        };
    } catch (e) {
        console.error('[ping] Cannot reach public URL:', e);
    }

    // If both are failing, we have a potential full network error -
    // either to the internet as a whole or to the server
    // (depending on what public url was used)
    return {
        state: ConnectionState.NETWORK_ERROR,
        user: undefined,
        error: 'Network error while trying to refresh user information.'
    }
}

export default ping;
