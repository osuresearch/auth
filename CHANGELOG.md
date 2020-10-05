# Change Log

Current unresolved issues can be found and reported on [YouTrack](https://ordevsvc01.rf.ohio-state.edu/youtrack/issues?q=%23oris\auth+%23Unresolved+)

Versions follow [Semantic Versioning](https://semver.org/) guidelines - given a version number MAJOR.MINOR.PATCH:

1. MAJOR version when you make incompatible API changes,
2. MINOR version when you add functionality in a backwards-compatible manner, and
3. PATCH version when you make backwards-compatible bug fixes.

# 2.0.0 (10-05-2020)

__Backwards Breaking Changes:__

`AuthenticationMonitor.reloadOnLogout` prop has changed from `false` to `true` as a default value. This new default value will force the user to refresh the page fully if their session is invalidated. You must manually specify it to `false` to turn on the popup login dialog feature (Note that the popup feature may not work yet with GraphQL applications).

Breaking changes have been made to how `<AuthProvider>` connects to a backend.

The `identityEndpoint` prop has been replaced with a required `driver` prop.

For applications that use JSON:API - you must import the JsonApi driver and use it as an argument to the provider:

```jsx
import JsonApi from '@oris/auth/dist/drivers/JsonApi';

function App() {
    return (
        <AuthProvider driver={JsonApi()}>
            ... your app components ...
        </AuthProvider>
    )
}
```

By default, the `JsonApi` driver will use `/app-name/api/user` and `/app-name/api/emulate` endpoints. If you are using different endpoints, you must specify the URLs as arguments:

```jsx
<AuthProvider driver={JsonApi(
    '/my/path/to/api/user', 
    '/my/path/to/api/emulate'
)}>
    ...
</AuthProvider>
```

A `GraphQL` driver is included for applications using [ORIS\GraphQL](https://code.osu.edu/oris/graphql).

```jsx
import GraphQL from '@oris/auth/dist/drivers/GraphQL';

function App() {
    return (
        <AuthProvider driver={GraphQL()}>
            ... your app components ...
        </AuthProvider>
    )
}
```

__New Features:__

* Added support for GraphQL
* Added `can(action: string, on?: IHasPolicies)` to the `useIdentity` hook to test against user permissions and contextual policies.
* Added `<Can>` component to wrap around the aforementioned function.
    * Note that policies are **not** supported for the logged in user if using a `JsonApi` driver in AuthProvider. 
    * `JsonApi` does support usage for permission checks: `<Can do="foo.some-action">`
* Added `<SimpleSignOutButton />` if you want a sign out button for an app to meet audit compliance without having to use the full `<Profile>` component.


# 1.0.1 (06-01-2020)

__Bug Fixes:__

* Fixed Emulation modal not closing correctly

# 1.0.0 (05-26-2020)

Initial release
