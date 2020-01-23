import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { StyleContext } from '../theme/StyleContext';

export default function DetailsScreen({ navigation }: any) {
	const styleContext = useContext(StyleContext);

	return (
		<View style={styleContext.container} testID="app-details" accessibilityLabel="app-details">
			<Text>Details Screen</Text>
			<Text>
				itemId: {JSON.stringify(navigation.getParam('itemId', null))}
			</Text>
			<Text>
				otherParam: {JSON.stringify(navigation.getParam('otherParam', null))}
			</Text>
			<Text>
				somer otherParam: {JSON.stringify(navigation.getParam('doesNotExist', 'This param does not exist'))}
			</Text>
			<Button title="Go to the details screen again?"
				type="outline"
				onPress={() => navigation.push('Details')}
			/>
			<Button title="Go to Home"
				type="outline"
				onPress={() => navigation.navigate('Home')}
			/>
			<Button title="Go back"
				type="outline"
				onPress={() => navigation.goBack()}
			/>
			<Button title="Set the id to something else"
				type="outline"
				onPress={() => navigation.setParams({ itemId: Math.round (Math.random() * 100) })}
			/>
		</View>
	);
}
