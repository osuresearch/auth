import { ConnectionState } from '../types';
/**
 * IdM identity access
 */
declare function useIdentity(): {
    user: import("../types").Identity | undefined;
    state: ConnectionState;
    permissions: Set<string>;
    verifyLogin: () => Promise<any>;
    logout: () => void;
};
export default useIdentity;
//# sourceMappingURL=useIdentity.d.ts.map