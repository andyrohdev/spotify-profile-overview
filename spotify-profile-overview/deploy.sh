#!/usr/bin/env sh

# Exit the script on errors
set -e

# Build the project
npm run build

# Navigate into the build output directory (dist)
cd dist

# Initialize a new git repository inside the dist folder
git init
git add -A
git commit -m 'New Deployment'

# Push the content to the gh-pages branch on your new repository
git push -f https://github.com/andyrohdev/spotify-profile-overview.git master:gh-pages

# Return to the project root directory
cd -
