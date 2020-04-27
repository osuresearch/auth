
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { basepath } from '../utility';

/**
 * Emulation query and control
 */
function useEmulation() {
    const { state, user } = useContext(AuthContext);

    if (typeof state === 'undefined') {
        throw new Error(
            'Cannot call `useEmulation` outside an IdM context. ' +
            'Are you calling it from outside an AuthProvider?'
        );
    }
    
    const active = user?.emulation?.active || false;
    const allowed = user?.emulation?.allowed || false;
    
    const emulate = async (id?: string) => {
        await fetch(`${basepath()}/api/emulate`, {
            method: id ? 'POST' : 'DELETE',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        window.location.href = basepath();
    };

    return {
        active,
        allowed,
        emulate
    };
}

export default useEmulation;
