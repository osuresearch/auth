
import { Identity } from '../types';

export function getMockIdentity(): Identity {
    return {
        name: 'Chase',
        id: '200275154',
        email: 'mcmanning.1@osu.edu',
        username: 'mcmanning.1',
        emulation: {
            active: false,
            allowed: true
        },
        permissions: ['emulate', 'foo.bar', 'fizz.buzz'],
        policies: ['foo', 'fizz'],
    };
}
