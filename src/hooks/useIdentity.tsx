
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { ConnectionState } from '../types';

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
    
    return {
        user,
        state: state || ConnectionState.UNKNOWN,
        permissions: new Set(user?.permissions || []),
        verifyLogin,
        logout
    };
}

export default useIdentity;
