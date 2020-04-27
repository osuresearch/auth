
# Contributing

Talk to Chase.

## Deploying Package Updates

The following steps **must** be taken to completion:

0th step: Determine your next version number. See the top of CHANGELOG.md to calculate the next number. Assuming your next build # is X.Y.Z:

1. Update CHANGELOG.md with a section for X.Y.Z detailing all bug fixes, new features, and backwards breaking changes (if any). Add the deployment date.
2. Update package.json to `"version": "X.Y.Z"`
3. Rebuild dist - `npm run build`
4. Update any documentation as necessary (Wiki pages, README, etc)
5. Commit to master. 
6. Create a tag from master exactly as `"X.Y.Z"`
7. Notify other developers that a new version has been released
8. Close out any YouTrack tickets related to the new version
