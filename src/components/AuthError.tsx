import React from 'react';
import ContactUs from './ContactUs';
import FullPageMessage from './FullPageMessage';

/**
 * Display error information when the authentication endpoint has an error
 * (backend issue of some sort, Apache, PHP, SQL, etc etc)
 */
const AuthError: React.FC<{ error?: string }> = ({ error }) => {
    return (
        <FullPageMessage title="Authentication Error">
            <p className="lead">{error}</p>

            <ContactUs title="Authentication Error" error={error} />
        </FullPageMessage>
    );
};

export default AuthError;
