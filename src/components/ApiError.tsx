import React from 'react';

/**
 * Display error information when the authentication endpoint has an error
 * (backend issue of some sort, Apache, PHP, SQL, etc etc)
 */
const ApiError: React.FC<{ error?: string }> = ({ error }) => {
    const subject = `${process.env.REACT_APP_WEBSITE_NAME} - Authentication Error`;
    const body = `
    ** Please add any helpful information here - such as how you were trying to
    access the page (bookmark, search bar, navigation link from another website, etc) **

Page: ${window.location.href}
Error: ${error || 'No Error Reported'}
Browser: ${navigator.userAgent}
`;

    const mailToLink = `mailto:orhelpdesk@osu.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return (
        <div style={{ margin: '2rem' }}>
            <h1>Authentication Error</h1>
            <p>{error}</p>

            <p className="error-help">
                For assistance please contact the OR Help Desk
                at <a href={mailToLink}><i className="fa fa-envelope-o" /> orhelpdesk@osu.edu</a>
            </p>
        </div>
    );
};

export default ApiError;
