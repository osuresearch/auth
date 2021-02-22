
import { basepath } from '../internal/utility';
import { IDriver, ConnectionState, Identity, DriverResponse } from '../types';

interface GraphQLAuthResponse {
    me: {
        id: string;
        username: string;
        email: string;
        name: string;

        permissions: string[];

        emulation: {
            active: boolean;
            allowed: boolean;
        }
    }
};

class GraphQLDriver implements IDriver
{
    private endpoint: string;

    public constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    /**
     * @throws {Error}              If a network error occurs (such as a CORS error)
     *
     * @returns {DriverResponse}    Response with user information or error information
     *                              if the server's response payload is invalid.
     */
    public async refreshIdentity(): Promise<DriverResponse> {
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
                        name
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

        // Try to parse out user data from the response payload.
        try {
            const { data } = await res.json();

            // Ensure the payload is not malformed
            if (typeof data === 'undefined' || typeof data.me === 'undefined') {
                throw new Error();
            }

            const response = (data as GraphQLAuthResponse).me;
            const user: Identity = {
                id: response.id,
                name: response.name,
                username: response.username,
                email: response.email,
                permissions: response.permissions,
                emulation: response.emulation
            };

            // If it parsed correctly, pass the identity forward
            return {
                state: ConnectionState.LOGGED_IN,
                user,
                error: undefined
            };
        } catch (e) {
            console.error('[auth]- GraphQL Driver Error:', e);

            // Any errors will be caught as a parsing issue from the API.
            return {
                state: ConnectionState.API_ERROR,
                user: undefined,
                error: 'The server did not provide valid user information'
            }
        }
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

        // TODO: Parse the response for errors.
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

        // TODO: Parse the response for errors.
    }
}

export default function GraphQL(
    endpoint: string = `${basepath()}/api/graphql/`
) {
    return new GraphQLDriver(endpoint);
}
