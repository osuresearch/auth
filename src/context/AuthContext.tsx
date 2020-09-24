
import { createContext } from 'react';
import { Identity, ConnectionState } from '../types';

export interface AuthContextState {
    user?: Identity;

    logout(): void;
    verifyLogin(): Promise<any>;

    emulate(id: string): Promise<any>;
    clearEmulation(): Promise<any>;

    state: ConnectionState;
};

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export default AuthContext;
