import React, { createContext, useContext, useEffect } from 'react';
import { AlertIOS, NativeEventEmitter } from 'react-native';
import NotificationHubIOS from 'react-native-azurenotificationhub/index.ios';
// import NotificationHub from 'react-native-azurenotificationhub';

//Config
const connectionString = '...'; // The Notification Hub connection string
const hubName = '...';          // The Notification Hub name
const tags = [];           // The set of tags to subscribe to
// const PushNotificationEmitter = new NativeEventEmitter(NotificationHub);

const NOTIF_REGISTER_AZURE_HUB_EVENT = 'azureNotificationHubRegistered';
const NOTIF_AZURE_HUB_REGISTRATION_ERROR_EVENT = 'azureNotificationHubRegistrationError';
const DEVICE_NOTIF_EVENT = 'remoteNotificationReceived';

const senderID = '...';         // The Sender ID from the Cloud Messaging tab of the Firebase console



var remoteNotificationsDeviceToken = '';  // The device token registered with APNS




export const NotificationContext = createContext({
	requestPermissions: () => {},
	register: () => {},
	unregister: () => {}
});


export function IOSNotifications({ children }: any) {
  function requestPermissions() {
    // register: Fired when the user registers for remote notifications. The
    // handler will be invoked with a hex string representing the deviceToken.
    NotificationHubIOS.addEventListener('register', _onRegistered);

    // registrationError: Fired when the user fails to register for remote
    // notifications. Typically occurs when APNS is having issues, or the device
    // is a simulator. The handler will be invoked with {message: string, code: number, details: any}.
    NotificationHubIOS.addEventListener('registrationError', _onRegistrationError);

    // registerAzureNotificationHub: Fired when registration with azure notification hubs successful
    // with object {success: true}
    NotificationHubIOS.addEventListener('registerAzureNotificationHub', _onAzureNotificationHubRegistered);

    // azureNotificationHubRegistrationError: Fired when registration with azure notification hubs
    // fails with object {message: string, details: any}
    NotificationHubIOS.addEventListener('azureNotificationHubRegistrationError', _onAzureNotificationHubRegistrationError);

    // notification: Fired when a remote notification is received. The
    // handler will be invoked with an instance of `AzureNotificationHubIOS`.
    NotificationHubIOS.addEventListener('notification', _onRemoteNotification);

    // localNotification: Fired when a local notification is received. The
    // handler will be invoked with an instance of `AzureNotificationHubIOS`.
    NotificationHubIOS.addEventListener('localNotification', _onLocalNotification);

    // Requests notification permissions from iOS, prompting the user's
    // dialog box. By default, it will request all notification permissions, but
    // a subset of these can be requested by passing a map of requested
    // permissions.
    // The following permissions are supported:
    //  - `alert`
    //  - `badge`
    //  - `sound`
    //
    // returns a promise that will resolve when the user accepts,
    // rejects, or if the permissions were previously rejected. The promise
    // resolves to the current state of the permission of
    // {alert: boolean, badge: boolean,sound: boolean }
    NotificationHubIOS.requestPermissions();
  }

  function register() {
    NotificationHubIOS.register(remoteNotificationsDeviceToken, {connectionString, hubName, tags});
  }

  function unregister() {
		NotificationHubIOS.unregister();
	}

	return <NotificationContext.Provider value={{
		requestPermissions,
		register,
		unregister
	}
	}>
		{ children }
	</NotificationContext.Provider>

  function _onRegistered(deviceToken) {
    remoteNotificationsDeviceToken = deviceToken;
    AlertIOS.alert(
      'Registered For Remote Push',
      `Device Token: ${deviceToken}`,
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  function _onRegistrationError(error) {
    AlertIOS.alert(
      'Failed To Register For Remote Push',
      `Error (${error.code}): ${error.message}`,
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  function _onRemoteNotification(notification) {
    AlertIOS.alert(
      'Push Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  function _onAzureNotificationHubRegistered(registrationInfo) {
    AlertIOS.alert('Registered For Azure notification hub',
      'Registered For Azure notification hub'
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  function _onAzureNotificationHubRegistrationError(error) {
    AlertIOS.alert(
      'Failed To Register For Azure Notification Hub',
      `Error (${error.code}): ${error.message}`,
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  function _onLocalNotification(notification){
    // Note notification will be object for iOS
    AlertIOS.alert(
      'Local Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }
}

// export function AndroidNotifications({ children }) {
// 	useEffect(() => {
//     PushNotificationEmitter.addListener(DEVICE_NOTIF_EVENT, _onRemoteNotification);
// 	}, []);

//   function register() {
//     PushNotificationEmitter.addListener(NOTIF_REGISTER_AZURE_HUB_EVENT, _onAzureNotificationHubRegistered);
//     PushNotificationEmitter.addListener(NOTIF_AZURE_HUB_REGISTRATION_ERROR_EVENT, _onAzureNotificationHubRegistrationError);

//     NotificationHub.register({connectionString, hubName, senderID, tags})
//       .catch(reason => console.warn(reason));
//   }

//   function unregister() {
//     NotificationHub.unregister()
//       .catch(reason => console.warn(reason));
// 	}


// 	return (
// 		<NotificationContext.Provider value={{
// 			requestPermissions: () => {},
// 			register,
// 			unregister,
// 		}}>
// 			{ children }
// 		</NotificationContext.Provider>
// 	);

//   function _onAzureNotificationHubRegistered(registrationID) {
//     console.warn('RegistrationID: ' + registrationID);
//   }

//   function _onAzureNotificationHubRegistrationError(error) {
//     console.warn('Error: ' + error);
//   }

//   function _onRemoteNotification(notification) {
//     // Note notification will be a JSON string for android
//     console.warn('Notification received: ' + notification);
//   }
// }
