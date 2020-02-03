import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Reactotron from 'reactotron-react-native';

const configuration = {
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

PushNotification.configure(configuration);

export default PushNotification;
