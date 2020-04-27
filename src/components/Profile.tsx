
import React from 'react';
import useIdentity from '../hooks/useIdentity';

export interface Props {
    /**
     * URL to redirect a user to edit their profile information.
     * Defaults to `/register` on the same host.
     */
    editUrl?: string;
}

const Profile: React.FC<Props> = ({ editUrl = '/register', children }) => {
    const { user, logout } = useIdentity();

    // Not logged in - nothing to show.
    if (!user) {
        return null;
    }
    
    return (
        <div className="profile dropdown">
            {/* TODO: This needs to be a button, not an href="#" element to appease the React accessibility gods.
                But the CSS fix for that to be a button needs to be updated in ORIS/UI - not here. 
            */}
            <a href="#" className="dropdown-toggle"
                id="profile-dropdown" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                {user.username}
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="profile-dropdown">
                <a className="dropdown-item" href={editUrl}>
                    My Profile
                </a>

                {children}

                <div className="dropdown-divider"></div>
                <button className="dropdown-item profile-logout" onClick={logout}>Logout</button>
            </div>
        </div>
    );
}

export default Profile;
