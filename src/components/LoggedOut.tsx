import React from 'react';
import FullPageMessage from './FullPageMessage';

/**
 * Display a "you've been automatically logged out" type page,
 * forcing the user to reauthenticate with Shibboleth.
 */
const LoggedOut: React.FC = () => {
    return (
        <FullPageMessage title="You have been logged out for inactivity.">
            {/* Language copied from OCIOs Shibboleth logout page */}
            <p className="lead" style={{ marginBottom: '2.5rem' }}>
                Remember to <a href="https://ocio.osu.edu/KB02788">clear your browser history</a> to avoid
                improper access to whatever web sites you've been using if this is a shared machine,
                and never leave your own machine unlocked and unattended.
            </p>

            {/* Form action is used to avoid local caching / React Router handling */}
            <form action={process.env.PUBLIC_URL}>
                <button type="submit" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                    Log In
                </button>
            </form>
        </FullPageMessage>
    );
};

export default LoggedOut;
