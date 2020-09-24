
import React, { useRef, useEffect, useState } from 'react';
import { ConnectionState } from '../types';
import useIdentity from '../hooks/useIdentity';

import Modal from '../internal/Modal';
import { basepath } from '../internal/utility';

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
};

/**
 * Modal that appears and blocks user action when when the user is no longer authenticated.
 * 
 * The user has the ability to log back into the application via a popup window
 * to avoid losing any unsaved work (This behavior can be disabled via `reloadOnLogout`)
 */
const AuthenticationMonitor: React.FC<Props> = ({ 
    reloadOnLogout = true,
    loginUrl = `${basepath()}/api/login`
}) => {
    const { state, verifyLogin } = useIdentity();
    const [showModal, setShowModal] = useState(false);
    const [loginWindow, setLoginWindow] = useState<Window>();

    // Displays the login modal the moment the user is no longer logged in.
    // This will fire a verifyLogin() that will close the modal once they
    // have logged back into the application.
    useEffect(() => {
        console.debug('[AuthenticationMonitor] Effect', state);

        if (state === ConnectionState.NOT_LOGGED_IN) {
            // Component is configured not to prompt for login, just redirect them.
            if (reloadOnLogout) {
                window.location.href = basepath();
                return;
            }

            setShowModal(true);
            verifyLogin().then(() => setShowModal(false));
        } else {
            setShowModal(false);
        }
    }, [state, reloadOnLogout, verifyLogin]);

    // When the loginWindow popup is open, monitor the status on
    // an interval. Once it's closed, clear our reference to it.
    useEffect(() => {
        console.debug('[AuthenticationMonitor] Window ref changed', loginWindow);
        const handle = setInterval(() => {
            if (loginWindow && loginWindow.closed) {
                setLoginWindow(undefined);
            }
        }, 800);

        return () => clearInterval(handle);
    }, [loginWindow]);

    // Open a browser popup window to start a new login session.
    // This has to happen directly from user action (e.g. clicking
    // a button) otherwise most popup blockers will block it.
    const openLoginWindow = () => {
        if (loginWindow && !loginWindow.closed) {
            loginWindow.focus();
            return;
        }

        const newWindow = window.open(
            loginUrl,
            'Login',
            'width=800,height=600'
        );

        // TODO: Handle null retval. Popup blocker?
        setLoginWindow(newWindow || undefined);
    }

    const isLoginWindowOpen = loginWindow && !loginWindow.closed;

    return (
        <Modal title="Session Expired" isOpen={showModal} hasCloseButton={false}>
            <div className="modal-body">
                <p>Your session has expired and you have been logged out.</p>

                <p>
                    To avoid losing any unsaved work, click the <strong>Login</strong> button 
                    below to log back into the application.
                </p>
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-success"
                    onClick={openLoginWindow}>

                    {isLoginWindowOpen &&
                        <span><i className="fa fa-spinner fa-spin"></i>
                            &nbsp; Waiting for login...
                        </span>
                    }

                    {!isLoginWindowOpen &&
                        <span>Login</span>
                    } 
                </button>
            </div>
        </Modal>
    );
}

export default AuthenticationMonitor;
