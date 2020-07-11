
import { ApiAdapter, ConnectionState, Identity, Permission } from '../types';
import { basepath } from '../internal/utility';

/** Payload from a JSON:API IdM endpoint */
interface IdentityJsonApiResponse {
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
        }
    }
};

export default class JsonApiAdapter implements ApiAdapter
{
    static API_ENDPOINT = `${basepath()}/api/user`;

    public async refreshIdentity(): Promise<[ConnectionState, Identity]> {
        // Grab updated identity information. Non-200 response 
        // is the assumption that we're no longer authenticated
        const res = await fetch(JsonApiAdapter.API_ENDPOINT, {
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
    }
}
