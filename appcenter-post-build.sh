#!/bin/bash

# if [ "$AGENT_JOBSTATUS" == "Succeeded" ]; then
#     if [ "$APPCENTER_BRANCH" == "master" ];
#      then
# 		 	echo
#         curl \
#         -F "status=2" \
#         -F "ipa=@$APPCENTER_OUTPUT_DIRECTORY/MyApps.ipa" \
#         -H "X-HockeyAppToken: $HOCKEYAPP_API_TOKEN" \
#         https://rink.hockeyapp.net/api/2/apps/$HOCKEYAPP_APP_ID/app_versions/upload
#     else
#         echo "Current branch is $APPCENTER_BRANCH"
#     fi
# fi

if [ "$APPCENTER_BRANCH" == "master" ]; then
	echo "*** Current branch is $APPCENTER_BRANCH"
	echo "*** Output directory $APPCENTER_OUTPUT_DIRECTORY"
fi
