
# @oris/auth

React components for authentication and authorization


## Requirements

Bootstrap 4 is required for the UI components `AuthenticationMonitor` and `Profile`.

A backend API is required for user session handling. See the identity and emulate endpoints in [ORIS/Template](https://code.osu.edu/ORIS/template/tree/master/api/endpoints) for a supported implementation. 


## Installation

```
npm install git+ssh://git@code.osu.edu:ORIS/auth.git
```


## Usage

Wrap your main app with an `AuthProvider` and add an `AuthenticationMonitor` to automatically handle session expirations:

```jsx
import { AuthProvider, AuthenticationMonitor } from '@oris/auth';

function App() {
    return (
        <AuthProvider>
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

The `useIdentity` hook can then be used to provide logged in user information:

```jsx
import { useIdentity } from '@oris/auth';

function MyComponent() {
    const { user, permissions } = useIdentity();

    if (!user) {
        return <div>Not logged in</div>;
    }

    return (
        <div>
            <p>Hello {user.name}</p>

            {permissions.has('myapp.can-read-reports') &&
                <Link to="/reports">Read reports</Link>
            }
        </div>
    );
}
```

For more comprehensive examples, see the wiki.

## Known Issues

### CRA / Webpack Compatibility 

Your application running under Webpack must be hosted on the same base path as if it were deployed. E.g. `http://localhost:3000/my-app`

The reauthentication process does not work if you are running an application locally through Webpack/CRA. To test this behavior, you will need to run your application on a real server behind Shibboleth.



## Contributing

See CONTRIBUTING.md

