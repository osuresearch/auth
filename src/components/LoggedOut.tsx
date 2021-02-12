import React from 'react';

/**
 * Display a "you've been automatically logged out" type page,
 * forcing the user to reauthenticate with Shibboleth.
 */
const LoggedOut: React.FC = () => {
    // CSS is baked in for now since it's the only component with css
    return (
        <div className="logged-out" style={{
            width: '100vw',
            height: '100%',
            minHeight: '100vh',
            backgroundColor: '#efefef',
            textAlign: 'center',
            backgroundImage: 'url(/assets/img/buckeye-leaf.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '80%',
            backgroundPosition: '5% 15%',
        }}>
            <div className="logged-out-banner" style={{
                borderBottom: '10px solid #BB0000',
                backgroundImage: 'url(/assets/img/grey-ohio-banner.jpg)',
                height: 175,
                backgroundPosition: 'center right',
                backgroundSize: '100% auto',
            }}></div>

            <div className="logged-out-message" style={{ padding: '5% 15%' }}>
                <h1 style={{ marginBottom: '1.5rem' }}>You have been logged out for inactivity.</h1>

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
            </div>
        </div>
    );
};

export default LoggedOut;
