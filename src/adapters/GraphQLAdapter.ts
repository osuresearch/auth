
import { ApiAdapter, ConnectionState, Identity, Permission } from '../types';
import { basepath } from '../internal/utility';

interface GraphQLAuthResponse {
    data: {
        me: {
            id: string;
            username: string;
            email: string;
            firstName: string;
    
            permissions: Permission[];
    
            emulation: {
                active: boolean;
                allowed: boolean;
            }
        }
    }
};

export default class GraphQLAdapter implements ApiAdapter
{
    static API_ENDPOINT = `${basepath()}/api/graphql`;

    public async refreshIdentity(): Promise<[ConnectionState, Identity]> {
        const res = await fetch(GraphQLAdapter.API_ENDPOINT, {
            method: 'POST',
            cache: 'no-cache',
            redirect: 'follow',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: `
                {
                    me {
                        id
                        username
                        email
                        firstName
                        permissions
                        emulation {
                            active
                            allowed
                        }
                    }
                }
            `})
        });

        const { data } = await res.json();

        // Ensure the payload is not malformed
        if (typeof data.data === 'undefined' || typeof data.data.me === 'undefined') {
            throw new Error(`Malformed API response: ${JSON.stringify(data)}`);
        }

        const response = (data as GraphQLAuthResponse).data.me;
        const identity: Identity = {
            id: response.id,
            name: response.firstName,
            username: response.username,
            email: response.email,
            permissions: response.permissions,
            emulation: response.emulation
        };

        return [ConnectionState.LOGGED_IN, identity];
    }
}
