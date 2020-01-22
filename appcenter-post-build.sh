#!/usr/bin/env bash

if [ "$AGENT_JOBSTATUS" == "Succeeded" ]; then
	if [ "$APPCENTER_BRANCH" == "master" ]; then
		echo "Package tests and packages with Maven"
		cd e2e/iOS && mvn -DskipTests -P prepare-for-upload package

		echo "Upload and schedule tests on real devices"
		appcenter test run appium --app "$APP_NAME" --devices $DEVICE_ID --app-path $APPCENTER_OUTPUT_DIRECTORY/ReactNativeTestDeploy.ipa --test-series "launch-tests" --locale "en_US" --build-dir target/upload
	else
		echo "Build did not succeed, cancelling postbuild script"
	fi
fi
