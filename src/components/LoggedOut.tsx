import React from 'react';

import './LoggedOut.scss';

/**
 * Display a "you've been automatically logged out" type page,
 * forcing the user to reauthenticate with Shibboleth.
 */
const LoggedOut: React.FC = () => {
    return (
        <div className="logged-out">
            <div className="logged-out-banner"></div>

            <div className="logged-out-message">
                <h1>You have been logged out for inactivity.</h1>

                {/* Language copied from OCIOs Shibboleth logout page */}
                <p className="lead">
                    Remember to <a href="https://ocio.osu.edu/KB02788">clear your browser history</a> to avoid
                    improper access to whatever web sites you've been using if this is a shared machine,
                    and never leave your own machine unlocked and unattended.
                </p>

                {/* Form action is used to avoid local caching / React Router handling */}
                <form action={process.env.PUBLIC_URL}>
                    <button type="submit" className="btn btn-primary">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoggedOut;
