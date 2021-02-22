import React from 'react';
export interface Props {
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
declare const ReauthenticateModal: React.FC<Props>;
export default ReauthenticateModal;
//# sourceMappingURL=ReauthenticateModal.d.ts.map