#!/usr/bin/env bash

# Install App Center CLI
npm install -g appcenter-CLI


# Log in to the App Center
echo "Logging in to the App Center"
appcenter login --token $APP_CENTER_LOGIN_TOKEN