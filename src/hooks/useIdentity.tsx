
import { useCallback, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { ConnectionState, IHasPolicies } from '../types';

/**
 * IdM identity access
 */
function useIdentity() {
    return useContext(AuthContext);
}

export default useIdentity;
