
import { basepath } from '../internal/utility';
import { ApiDriver, ConnectionState, Identity, Permission, Policy } from '../types';

interface GraphQLAuthResponse {
    me: {
        id: string;
        username: string;
        email: string;
        firstName: string;

        permissions: Permission[];
        policies: Policy[];

        emulation: {
            active: boolean;
            allowed: boolean;
        }
    }
};

class GraphQLDriver implements ApiDriver
{
    private endpoint: string;

    public constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    public async refreshIdentity(): Promise<[ConnectionState, Identity]> {
        // COULD use Apollo here, but there's not much point in it.
        // We don't want any sort of caching / "smart" stuff here.
        const res = await fetch(this.endpoint, {
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
                        policies
                        emulation {
                            active
                            allowed
                        }
                    }
                }
            `})
        });

        const { data } = await res.json();

        console.debug(data);

        // Ensure the payload is not malformed
        if (typeof data === 'undefined' || typeof data.me === 'undefined') {
            throw new Error(`Malformed API response: ${JSON.stringify(data)}`);
        }

        const response = (data as GraphQLAuthResponse).me;
        const identity: Identity = {
            id: response.id,
            name: response.firstName,
            username: response.username,
            email: response.email,
            permissions: response.permissions,
            policies: response.policies,
            emulation: response.emulation
        };

        return [ConnectionState.LOGGED_IN, identity];
    }
    
    public async emulate(id: string): Promise<void> {
        const res = await fetch(this.endpoint, {
            method: 'POST',
            cache: 'no-cache',
            redirect: 'follow',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation SetEmulation($id: String!) {
                        emulate(identifier: $id) {
                            id
                            username
                        }
                    }
                `, 
                variables: {
                    id
                }
            })
        });

        const { data } = await res.json();

        // do a thing.
    }
    
    public async clearEmulation(): Promise<void> {
        const res = await fetch(this.endpoint, {
            method: 'POST',
            cache: 'no-cache',
            redirect: 'follow',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation ClearEmulation {
                        emulate {
                            id
                            username
                        }
                    }
                `
            })
        });

        const { data } = await res.json();
    }
}

export default function GraphQL(
    endpoint: string = `${basepath()}/api/graphql`
) {
    return new GraphQLDriver(endpoint);
}
