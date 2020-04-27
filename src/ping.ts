
import { ConnectionState, Identity, IdentityJsonApiResponse } from './types';

/**
 * Check our connection state and get updated IdM information, if possible.
 * 
 * @return {Promise} Current connection state and updated IdM information, if connected
 */
async function ping(identityEndpoint: string, publicTestUrl: string): Promise<[ConnectionState, Identity|undefined]> {
    try {
        console.debug('[ping] GET', identityEndpoint);

        // Grab updated identity information. Non-200 response 
        // is the assumption that we're no longer authenticated
        const res = await fetch(identityEndpoint, {
            cache: 'no-cache',
            redirect: 'follow',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const { data } = await res.json();

        // Ensure the payload is not malformed
        if (typeof data.attributes === 'undefined' || data.type !== 'User') {
            throw new Error(`Malformed identity API response: ${JSON.stringify(data)}`);
        }

        const jsonApiIdentity = data as IdentityJsonApiResponse;
        const identity: Identity = {
            id: jsonApiIdentity.id,
            // ...jsonApiIdentity.attributes
            
            // Make extractions explicit, otherwise developers may add  
            // extra stuff that won't be supported in the future AWS-lands.
            // Making migration that much harder. 
            name: jsonApiIdentity.attributes.name,
            username: jsonApiIdentity.attributes.username,
            email: jsonApiIdentity.attributes.email,
            permissions: jsonApiIdentity.attributes.permissions,
            emulation: jsonApiIdentity.attributes.emulation
        };

        return [ConnectionState.LOGGED_IN, identity];
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
