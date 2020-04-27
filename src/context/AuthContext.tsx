
import { createContext } from 'react';
import { Identity, ConnectionState } from '../types';

export interface AuthContextState {
    user?: Identity;

    logout(): void;
    verifyLogin(): Promise<any>;

    state: ConnectionState;
};

const AuthContext = createContext<Partial<AuthContextState>>({});

export default AuthContext;
