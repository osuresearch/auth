
import { ConnectionState, Identity, ApiDriver } from '../types';

/**
 * Check our connection state and get updated IdM information, if possible.
 * 
 * @return {Promise} Current connection state and updated IdM information, if connected
 */
async function ping(driver: ApiDriver, publicTestUrl: string): Promise<[ConnectionState, Identity|undefined]> {
    try {
        console.debug('[ping] Refresh');
        const result = await driver.refreshIdentity();
        return result;
    } catch (e) {
        console.error('[ping] Not logged in:', e);
    }

    try {
        console.debug('[ping] HEAD', publicTestUrl);

        // If a 200 response from the public url (or even a 404), 
        // the server is still reachable, we're just not authenticated
        await fetch(publicTestUrl, {
            method: 'HEAD',
            cache: 'no-cache',
            redirect: 'follow',
            credentials: 'same-origin'
        });

        return [ConnectionState.NOT_LOGGED_IN, undefined];
    } catch (e) {
        console.error('[ping] Cannot reach public URL:', e);
    }

    // If both are failing, we have another network error.
    return [ConnectionState.NETWORK_ERROR, undefined];
}

export default ping;
