import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { StyleContext } from '../theme/StyleContext';
import { NavigationStackProp } from 'react-navigation-stack';
import { percentageHeight } from '../theme/utils';
export default HomeScreen;

function HomeScreen({ navigation }: {
	navigation: NavigationStackProp
}) {
	const styleContext = useContext(StyleContext);
	return (
		<View style={styleContext.container} testID="app-home" accessibilityLabel="app-home">
			<Button title="Go to landing page"
				type="solid"
				style={{
					marginBottom: percentageHeight(5),
				}}
				onPress={() => navigation.navigate('Landing')}
			/>
			<Button title="Go to the details screen"
				type="outline"
				testID="go-to-details-button"
				accessibilityLabel="go-to-details-button"
				onPress={() => navigation.navigate('Details', {
					itemId: 123,
					otherParam: 'anything that you want here',
				})}
			/>
			<Button title="Go to the example page with text autocomplete"
				type="outline"
				testID="go-to-text-autocomplete-page"
				accessibilityLabel="go-to-text-autocomplete-page"
				onPress={() => navigation.navigate('TextAutoComplete')}
			/>
			<Button title="Go to the mapbox screen"
				type="outline"
				testID="go-to-mapbox-screen-button"
				accessibilityLabel="go-to-mapbox-screen-button"
				onPress={() => navigation.navigate('Mapbox')}
			/>
			<Button title="Go to the calendar screen"
				type="outline"
				testID="go-to-calendar-screen-button"
				accessibilityLabel="go-to-calendar-screen-button"
				onPress={() => navigation.navigate('Calendar')}
			/>
			<Button title="Go to the agenda screen"
				type="outline"
				testID="go-to-agenda-screen-button"
				accessibilityLabel="go-to-agenda-screen-button"
				onPress={() => navigation.navigate('Agenda')}
			/>
		</View>
	)
}
HomeScreen.navigationOptions = {
	title: 'Home screen'
}
