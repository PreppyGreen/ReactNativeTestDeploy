import React, { useContext } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import { NotificationContext } from '../AzureNotifications';

export default function NotificationScreen() {
	const context = useContext(NotificationContext);
	return (<View>
		{ Platform.OS == 'ios' && <Button title="Request permisions" onPress={context.requestPermissions} /> }
		<Button title="Register" onPress={context.register} />
		<Button title="Unregister" onPress={context.unregister} />
	</View>)
}
