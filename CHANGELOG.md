
# 3.1.0 (2021-03-30)

__Bug Fixes:__

* `GraphQL` Driver - Fixed reporting of errors during authentication.
    * `AuthError` will now report the first error message from GraphQL back to the user if available.


# 3.0.1 (2021-03-11)

__Internal Changes:__

* Added `.gitlab-ci.yml` to run automatic deployments to GitLab's NPM Package repository.


# 3.0.0 (2021-03-01)

__Backwards Breaking Changes:__

* Changed package name to `@ORIS/auth`
    * Required by GitLab to work with group-level package repositories
* Added drivers to the main export
  * Replace your imports from `@ORIS/auth/dist/drivers` to just `@ORIS/auth`
* `<AuthProvider>` - Refactored the logic flow for how it renders children based on auth state.
  * It will now only render children when the user is authenticated with the server. For authentication errors, or the user has logged out, or the user hasn't fully logged in yet, this will render a full-site replacement content instead of your application's content.
* Removed `<AuthenticationMonitor>` component.
  * Monitoring behaviour is now part of the main `<AuthProvider>`.

__Bug Fixes:__

* `useIdentity` - Changed `user: Identity | undefined` to `user: Identity`
    * We can now guarantee that a user exists when content within an `<AuthProvider>` is rendered.
* `<Can>` - Fixed a number of issues with the underlying logic
* Fixed an issue where each identity refresh caused a refresh of the whole application's content.
  * Now uses a deep comparison of the identity to determine if it should update states or not.

__New Features:__

* Added export of `<SimpleSignOutButton />`
    * This is for apps that do not need sophisticated authentication management but still need to comply to audit's requirements of having a log out button visible on all pages. Use this in place of `<Profile />` in your app's navbar.
* Added a new `ConnectionState.API_ERROR` state for when the API is reachable but throwing an invalid response (developer error)
* Added better error messages as to why the driver failed to keep the user synced (network error, backend API error, etc)
* Added a "logged out" screen to be displayed when Shibboleth times out the user's session.
  * Previously this was an automatic refresh of the application which caused a number of issues with the Shibboleth reauthentication process not kicking in properly so apps would be caught in an infinite refresh loop.
* Added instructions on how to test SSO timeout behaviour locally to the README


# 2.0.1 (10-06-2020)

__Bug Fixes:__

* Fixed OSX compatibility for the GraphQL driver

# 2.0.0 (10-05-2020)

__Backwards Breaking Changes:__

`AuthenticationMonitor.reloadOnLogout` prop has changed from `false` to `true` as a default value. This new default value will force the user to refresh the page fully if their session is invalidated. You must manually specify it to `false` to turn on the popup login dialog feature (Note that the popup feature may not work yet with GraphQL applications).

Breaking changes have been made to how `<AuthProvider>` connects to a backend.

The `identityEndpoint` prop has been replaced with a required `driver` prop.

For applications that use JSON:API - you must import the JsonApi driver and use it as an argument to the provider:

```jsx
import JsonApi from '@ORIS/auth/dist/drivers/JsonApi';

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
import GraphQL from '@ORIS/auth/dist/drivers/GraphQL';

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
    * `JsonApi` does support usage for permission checks via `<Can do="foo.some-action">` as long as your `/api/user` endpoint has an `attributes.permissions` field containing an array of allowed RBAC permissions for the logged in user.
* Added `<SimpleSignOutButton />` if you want a sign out button for an app to meet audit compliance without having to use the full `<Profile>` component.


# 1.0.1 (06-01-2020)

__Bug Fixes:__

* Fixed Emulation modal not closing correctly

# 1.0.0 (05-26-2020)

Initial release
