import React from 'react';

type Props = {
    title: string
    error?: string
}

const ContactUs: React.FC<Props> = ({ title, error }) => {
    const subject = `${process.env.REACT_APP_WEBSITE_NAME} - ${title}`;
    const body = `
    ** Please add any helpful information here - such as how you were trying to access
       the page (bookmark, link from another website) or feature you were trying to use. **

Page: ${window.location.href}
Error: ${error || 'No Error Reported'}
Browser: ${navigator.userAgent}
`;

    const mailToLink = `mailto:orhelpdesk@osu.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return (
        <p style={{ marginTop: '2.5rem' }}>
            For assistance please contact the OR Help Desk
            at <a href={mailToLink}><i className="fa fa-envelope-o" /> orhelpdesk@osu.edu</a>
            &nbsp;or <a href="tel:6146888288"><i className="fa fa-phone" /> 614-688-8288</a>.
        </p>
    );
};

export default ContactUs;
