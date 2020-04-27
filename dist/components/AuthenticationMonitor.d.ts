import React from 'react';
export interface Props {
    /**
     * If true, the component will not display a reauth modal and will instead
     * just redirect the user back to the front page of the app.
     */
    reloadOnLogout?: boolean;
    /**
     * Popup URL for reauthenticating the user.
     *
     * Defaults to /api/login on your app.
     */
    loginUrl?: string;
}
/**
 * Modal that appears and blocks user action when when the user is no longer authenticated.
 *
 * The user has the ability to log back into the application via a popup window
 * to avoid losing any unsaved work (This behavior can be disabled via `reloadOnLogout`)
 */
declare const AuthenticationMonitor: React.FC<Props>;
export default AuthenticationMonitor;
//# sourceMappingURL=AuthenticationMonitor.d.ts.map