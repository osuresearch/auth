
import AuthProvider from './components/AuthProvider';
import ReauthenticateModal from './components/ReauthenticateModal';
import Profile from './components/Profile';
import SimpleSignOutButton from './components/SimpleSignOutButton';
import Can from './components/Can';
import useIdentity from './hooks/useIdentity';
import useEmulation from './hooks/useEmulation';
import GraphQL from './drivers/GraphQL';
import JsonApi from './drivers/JsonApi';
import { IDriver, IHasPolicies } from './types';

export {
    // Components
    AuthProvider,
    ReauthenticateModal,
    Profile,
    SimpleSignOutButton,
    Can,

    // Hooks
    useIdentity,
    useEmulation,

    // Drivers
    GraphQL,
    JsonApi,
}

export type {
    // Interfaces
    IDriver,
    IHasPolicies,
}
