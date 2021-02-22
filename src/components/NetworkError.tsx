import React from 'react';
import ContactUs from './ContactUs';
import FullPageMessage from './FullPageMessage';

/**
 * Display error information when the user cannot connect to anything (even non-authenticated resources)
 */
const NetworkError: React.FC<{ error?: string }> = ({ error }) => {
    return (
        <FullPageMessage title="Network Error">
            <p className="lead">
                We are unable to communicate with the server. Please refresh the page and try again.
            </p>

            <ContactUs title="Network Error" error={error} />
        </FullPageMessage>
    );
};

export default NetworkError;
