import React, { useContext } from 'react';
import { StyleContext } from '../theme/StyleContext';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarScreen() {
	const styleContext = useContext(StyleContext);

	return (
		<View style={styleContext.container}>
			<Calendar />
		</View>
	);
}
