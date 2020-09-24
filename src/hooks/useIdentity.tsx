
import { useCallback, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { ConnectionState, IHasPolicies } from '../types';

/**
 * IdM identity access
 */
function useIdentity() {
    const { state, user, verifyLogin, logout } = useContext(AuthContext);

    if (typeof verifyLogin === 'undefined' || typeof logout === 'undefined') {
        throw new Error(
            'Cannot call `useIdentity` outside an IdM context. ' +
            'Are you calling it from outside an AuthProvider?'
        );
    }

    /**
     * Can the user perform the given action on some context (or globally)
     */
    const can = useCallback((action: string, on?: IHasPolicies) => {
        let allowed = false;

        if (typeof on !== 'undefined') {
            allowed = on.policies.indexOf(action) >= 0;
        } else if (user) {
            allowed = user.permissions.indexOf(action) >= 0
                    || user.policies.indexOf(action) >= 0;
        }

        return allowed;
    }, [user]);
    
    return {
        user,
        state: state || ConnectionState.UNKNOWN,
        permissions: new Set(user?.permissions || []),
        verifyLogin,
        logout,
        can,
    };
}

export default useIdentity;
