import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { StyleContext } from '../theme/StyleContext';

export default function TextAutoCompleteScreen() {
	const styleContext = useContext(StyleContext);
	return (
		<View style={styleContext.container}>
			<Text>todo: text auto complete input</Text>
		</View>
	);
}
