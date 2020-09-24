/** Default URL for Shibboleth SSO logouts. May be overridden in the AuthProvider */
export declare const DEFAULT_SSO_LOGOUT_URL = "/Shibboleth.sso/Logout?return=https://webauth.service.ohio-state.edu/idp/profile/Logout";
/**
 * Utility function to calculate the basepath of an application.
 *
 * If PUBLIC_URL is set - great. We'll use that. Otherwise
 * we have to assume it's on a subdirectory of the root.
 */
export declare function basepath(): string;
//# sourceMappingURL=utility.d.ts.map