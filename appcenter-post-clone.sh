#!/usr/bin/env bash
# Set node version to .nvmrc version
echo "Setting the node version to > 10.0.0"
nvm install
node -v

# Install App Center CLI
npm install -g appcenter-CLI


# Log in to the App Center
echo "Logging in to the App Center"
appcenter login --token $APP_CENTER_LOGIN_TOKEN
