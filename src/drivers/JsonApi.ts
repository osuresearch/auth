
import { basepath } from '../internal/utility';
import { IDriver, ConnectionState, Identity, Permission } from '../types';

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

/**
 * Driver that communicates with a standard JSON:API backend.
 */
class JsonApiDriver implements IDriver
{
    private endpoint: string;
    private emulateEndpoint: string;

    public constructor(endpoint: string, emulateEndpoint: string) {
        this.endpoint = endpoint;
        this.emulateEndpoint = emulateEndpoint;
    }

    public async refreshIdentity(): Promise<[ConnectionState, Identity]> {
        // Grab updated identity information. Non-200 response 
        // is the assumption that we're no longer authenticated
        const res = await fetch(this.endpoint, {
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
            emulation: jsonApiIdentity.attributes.emulation,

            // Policies are currently not supported by JSON:API.
            policies: [] 
        };

        return [ConnectionState.LOGGED_IN, identity];
    }

    public async emulate(id: string): Promise<void> {
        await fetch(this.emulateEndpoint, {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
    public async clearEmulation(): Promise<void> {
        await fetch(this.emulateEndpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export default function JsonApi(
    endpoint: string = `${basepath()}/api/user`,
    emulateEndpoint: string = `${basepath()}/api/emulate`
) {
    return new JsonApiDriver(endpoint, emulateEndpoint);
}
