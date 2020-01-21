# Requirements
- Maven

# Install steps

Install appium v1.11.0 globally

```
$ npm i -g appium@1.11.0
```

# Build iOS app

The iOS app can be built using the following command

```
$ npx react-native run-ios --configuration Release
```

# Build the Android app

The android app can be built using the following command

```
$ npx react-native run-android --variant=release
```

# Prepare the tests

Depending on if you're running iOS/Android apps, you will have to edit the corresponding `LaunchTest.java` with your own device details and path to your app that will be installed onto the device.

# Running the tests

Start appium

```
$ appium
```

This will run appium on port 4723.

Then run

```
$ mvn test
```
inside `e2e/<platform>` directory.
