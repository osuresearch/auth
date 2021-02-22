import React from 'react';

/**
 *
 */
const LoggingIn: React.FC = () => {
    return (
        <div style={{ margin: '1rem' }}>
            Logging into {process.env.REACT_APP_WEBSITE_NAME}...
        </div>
    );
};

export default LoggingIn;
