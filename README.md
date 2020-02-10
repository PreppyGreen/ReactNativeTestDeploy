# ReactNativeTestDeploy

## Mapbox setup
Create a `.env` file in the root of the project with the following contents
```
MAPBOX_KEY=<your_key_here>
```

## Tools
- [Appium](http://appium.io/)
- [Reactotron](https://github.com/infinitered/reactotron)


## Create a new project

```
npx react-native init ReactNativeTestDeploy
```

## Start using iOS

```
npx react-native run-ios
```

This will start Metro Bundler and the launch the iOS Simulator.



## Start using Android

```
npx react-native run-android
```

# App Center

https://appcenter.ms/users/oliver.booth-infinityworks.com/apps/testdeploy/

Add Crash and Analytics services to your app:

```
yarn add appcenter appcenter-analytics appcenter-crashes --save-exact
```

Install CocoaPods dependencies

```
cd ios
pod install
```

## Build steps

## Deployment steps

## Certificates and Provisioning profiles

# Auth

## SDK

https://docs.microsoft.com/en-us/appcenter/sdk/auth/react-native

```
yarn add appcenter-auth --save-exact
```

iOS
```
cd ios
pod install
```


## AD B2C

### Create a tenant
https://github.com/PreppyGreen/jwtauthspike


https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-devquickstarts-ios?tabs=applications


https://github.com/shedaltd/react-native-azure-ad-2


# Push Notifications

https://docs.microsoft.com/en-us/appcenter/sdk/push/react-native-ios

```
yarn add appcenter-push --save-exact
```

iOS
```
cd ios
pod install
```


## react-native-azurenotificationhub

NB removed @react-native-community/push-notification-ios

```
npm i react-native-azurenotificationhub
```

iOS
```
cd ios
pod install
```
