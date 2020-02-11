import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { IOSNotificationContext } from '../AzureNotifications';

export default function NotificationScreen() {
	const context = useContext(IOSNotificationContext);
	return (<View>
		<Button title="Request permisions" onPress={context.requestPermissions} />
		<Button title="Register" onPress={context.register} />
		<Button title="Unregister" onPress={context.unregister} />
	</View>)
}
