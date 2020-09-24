
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { basepath } from '../internal/utility';

/**
 * Emulation query and control
 */
function useEmulation() {
    const { state, user, emulate, clearEmulation } = useContext(AuthContext);

    if (typeof state === 'undefined') {
        throw new Error(
            'Cannot call `useEmulation` outside an IdM context. ' +
            'Are you calling it from outside an AuthProvider?'
        );
    }
    
    const active = user?.emulation?.active || false;
    const allowed = user?.emulation?.allowed || false;
    
    const emulateImpl = async (id?: string) => {
        if (id) {
            await emulate(id);
        } else {
            await clearEmulation();
        }

        window.location.href = basepath();
    };

    return {
        active,
        allowed,
        emulate: emulateImpl
    };
}

export default useEmulation;
