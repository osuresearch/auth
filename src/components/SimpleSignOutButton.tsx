
import React from 'react';
import { Icon } from '@oris/ui';

import { DEFAULT_SSO_LOGOUT_URL } from '../internal/utility';

type Props = {
    /**
     * Where to direct the user when the click the button.
     * 
     * By default, this logs them out of Shibboleth as a whole.
     */
    url?: string;
}

/**
 * Simple sign out button for apps without Profile but need to comply to audit
 */
const SimpleSignOutButton: React.FC<Props> = ({
    url = DEFAULT_SSO_LOGOUT_URL
}) => {
    return (
        <a href={url} title="Sign out" style={{marginLeft: 'auto'}}>
            <Icon name="sign-out" />
        </a>
    );
}

export default SimpleSignOutButton;
