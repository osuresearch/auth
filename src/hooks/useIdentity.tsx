
import { useCallback, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { ConnectionState, IHasPolicies } from '../types';

/**
 * IdM identity access
 */
function useIdentity() {
    const context = useContext(AuthContext);

    if (typeof context.verifyLogin === 'undefined') {
        throw new Error(
            'Cannot call `useIdentity` outside an authenticated context. ' +
            'Make sure it is only called from within an <AuthProvider>.'
        );
    }

    return context;
}

export default useIdentity;
