/// <reference types="react" />
import { Identity, ConnectionState } from '../types';
export interface AuthContextState {
    user?: Identity;
    logout(): void;
    verifyLogin(): Promise<any>;
    state: ConnectionState;
}
declare const AuthContext: import("react").Context<Partial<AuthContextState>>;
export default AuthContext;
//# sourceMappingURL=AuthContext.d.ts.map