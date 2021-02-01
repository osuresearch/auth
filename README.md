
# @oris/auth

React components for authentication and authorization


## Requirements

Bootstrap 4 is required for the UI components `AuthenticationMonitor` and `Profile`.

A backend API is required for user session handling. See the identity and emulate endpoints in [ORIS/Template](https://code.osu.edu/ORIS/template/tree/master/api/endpoints) for a supported implementation.


## Installation

```
npm install git+ssh://git@code.osu.edu:ORIS/auth.git#semver:^2
```


## Usage

Wrap your main app with an `AuthProvider` and add an `AuthenticationMonitor` to automatically handle session expirations:

```jsx
import { AuthProvider, AuthenticationMonitor } from '@oris/auth';
import GraphQL from '@oris/auth/dist/drivers/GraphQL';

function App() {
    return (
        <AuthProvider driver={GraphQL()}>
            <AuthenticationMonitor />
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
import { useIdentity, Can } from '@oris/auth';

function MyComponent() {
    const { user } = useIdentity();

    if (!user) {
        return <div>Not logged in</div>;
    }

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


## Known Issues

### CRA / Webpack Compatibility

Your application running under Webpack must be hosted on the same base path as if it were deployed. E.g. `http://localhost:3000/my-app`

The reauthentication process does not work if you are running an application locally through Webpack/CRA. To test this behavior, you will need to run your application on a real server behind Shibboleth.


## Testing SSO Expirations

Since local development does not have Shibboleth SSO installed - you need to perform some extra work to test a forced logout state for your application.

1. Log into your app normally and interact with it.
2. In your `.htaccess` file - add the below rule immediately following the RewriteCond for API requests and before any other RewriteRules:

```sh
# Fake a Shibboleth session timeout on API requests.
RedirectMatch ^ "https://webauth.service.ohio-state.edu/idp/profile/SAML2/Redirect/SSO?SAMLRequest=BadRequest"
```

3. Wait for your application to log the user out (can take upwards of 5 minutes). Meanwhile - you can interact with other requests to identify places where they will fail and add logic to handle it gracefully (as all API requests will give you failures during the window between the forced logout and @oris/auth checking authentication state).
4. Remove the RedirectMatch to re-enable the application (would be equivalent to a user going through Shibboleth authentication again)


## Contributing

See CONTRIBUTING.md

