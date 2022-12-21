# @ORIS/auth Package

![npm@latest](https://img.shields.io/npm/v/@osuresearch/ui/latest)

React components for authentication and authorization


## Requirements

A backend API is required for user session handling.

For internal developers, these APIs are already provided with our GraphQL and REST application templates.

GitHub documentation is a work in progress.


## Installation

```
npm install @osuresearch/auth
```

## Usage

Wrap your main app with an `AuthProvider` to automatically handle session expirations:

```jsx
import {
    AuthProvider,
    GraphQL,
    Profile
} from '@osuresearch/auth';

function App() {
    return (
        <AuthProvider driver={GraphQL()}>
            <header>
                ...
            </header>
            <main>
                ...
            </main>
        </AuthProvider>
    );
}
```

The `useIdentity` hook can then be used to provide logged in user information and the `<Can>` component can test for permissions:

```jsx
import { useIdentity, Can } from '@ORIS/auth';

function MyComponent() {
    const { user } = useIdentity();

    return (
        <div>
            <p>Hello {user.name}</p>

            <Can do="my-app.read-reports">
                <Link to="/reports">Read reports</Link>
            </Can>
        </div>
    );
}
```

For more comprehensive examples, see the wiki.


## Testing SSO Expirations

Since local development does not have Shibboleth SSO installed - you need to perform some extra work to test a forced logout state for your application.

1. Log into your app normally and interact with it.
2. In your `.htaccess` file - add the below rule immediately following the RewriteCond for API requests and before any other RewriteRules:

```sh
# Fake a Shibboleth session timeout on API requests.
RedirectMatch ^ "https://webauth.service.ohio-state.edu/idp/profile/SAML2/Redirect/SSO?SAMLRequest=BadRequest"
```

3. Wait for your application to log the user out (can take upwards of 5 minutes). Meanwhile - you can interact with other requests to identify places where they will fail and add logic to handle it gracefully (as all API requests will give you failures during the window between the forced logout and @ORIS/auth checking authentication state).
4. Remove the RedirectMatch to re-enable the application (would be equivalent to a user going through Shibboleth authentication again)


## Changelog

The changelog can be found on the [Releases page](https://github.com/osuresearch/auth/releases).

Changes prior to `3.2` can be found in [CHANGELOG.md](CHANGELOG.md).

## Authors and license

[Chase McManning](https://github.com/McManning) and [contributors](https://github.com/osuresearch/auth/graphs/contributors).

MIT License, see the included [LICENSE](LICENSE.md) file.

