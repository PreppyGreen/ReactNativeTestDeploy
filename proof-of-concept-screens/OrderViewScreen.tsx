import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { StyleContext } from '../theme/StyleContext';

export default function OrderViewScreen() {
	const styleContext = useContext(StyleContext);

	return (
		<View style={styleContext.container}>
			<Text>TODO</Text>
		</View>
	);
}
