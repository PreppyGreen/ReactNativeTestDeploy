import React, { useContext } from 'react';
import { View } from 'react-native';
import { StyleContext } from '../theme/StyleContext';
import { Text } from 'react-native-elements';

export default function MapboxScreen() {
	const styleContext = useContext(StyleContext);
	return (
		<View style={styleContext.container}
		>
			<Text>ADD MAPS HERE</Text>
		</View>
	);
}
