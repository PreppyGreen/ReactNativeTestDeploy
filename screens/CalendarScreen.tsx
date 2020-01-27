import React, { useContext } from 'react';
import { StyleContext } from '../theme/StyleContext';
import { View, Text } from 'react-native';


export default function CalendarScreen() {
	const styleContext = useContext(StyleContext);

	return (
		<View style={styleContext.container}>
			<Text>TODO</Text>
		</View>
	);
}
