import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput,
  PushNotificationIOS,
  SafeAreaView,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import Reactotron from 'reactotron-react-native';
import BackgroundTimer from 'react-native-background-timer';

const configure = {
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    Reactotron.log('NOTIFICATION:', notification);

    // process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    notification.finish(PushNotificationIOS.FetchResult.NoData);
    //  notification.finish('backgroundFetchResultNewData');
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: 'YOUR GCM (OR FCM) SENDER ID',

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true,
};

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
		PushNotification.configure(configure);
	}
	componentDidMount() {
		BackgroundTimer.runBackgroundTimer(() => {
			Reactotron.log('background beeep bop')
		}, 3000);
	}
  render() {
    return (
      <SafeAreaView>
        <Button
          title={'call push notification'}
          onPress={() => {
            PushNotification.localNotificationSchedule({
              message: 'messasdfasdf',
              date: new Date(Date.now() + 4 * 1000),
            });
          }}
        />
        <Text>Welcome to React Native 0.58!</Text>
        <Text>To get started, edit App.js</Text>
        <Text>{instructions}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
