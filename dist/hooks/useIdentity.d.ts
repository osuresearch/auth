import { ConnectionState, IHasPolicies } from '../types';
/**
 * IdM identity access
 */
declare function useIdentity(): {
    user: import("../types").Identity | undefined;
    state: ConnectionState;
    permissions: Set<string>;
    verifyLogin: () => Promise<any>;
    logout: () => void;
    can: (action: string, on?: IHasPolicies | undefined) => boolean;
};
export default useIdentity;
//# sourceMappingURL=useIdentity.d.ts.map