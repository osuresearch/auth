import React from "react";

import Emulation from "./Emulation";
import useIdentity from "../hooks/useIdentity";

export interface Props {
  /**
   * URL to redirect a user to edit their profile information.
   * Defaults to `/register` on the same host.
   */
  editUrl?: string;
}

const Profile: React.FC<Props> = ({ editUrl = "/register", children }) => {
  const { user, logout } = useIdentity();

  // Not logged in - nothing to show.
  if (!user) {
    return null;
  }

  return (
    <div className="profile dropdown">
      <button
        className="dropdown-toggle"
        id="profile-dropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {user.username}
      </button>
      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="profile-dropdown"
      >
        <a className="dropdown-item" href={editUrl}>
          My Profile
        </a>

        {children}

        <div className="dropdown-divider"></div>

        <Emulation className="dropdown-item" />
        <button className="dropdown-item profile-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
