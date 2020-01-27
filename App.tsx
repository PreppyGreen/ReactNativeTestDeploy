import React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
	HomeScreen,
	TextAutoCompleteScreen,
	DetailsScreen,
	MapboxScreen,
	CalendarScreen,
} from './screens';
import StyleProvider from './theme/StyleContext';


const AppNavigator = createStackNavigator({
	Home: HomeScreen,
	Details: DetailsScreen,
	TextAutoComplete: TextAutoCompleteScreen,
	Mapbox: MapboxScreen,
	Calendar: CalendarScreen,
}, {
	initialRouteName: 'Home'
});

export default function App() {
	const Navigator = createAppContainer(AppNavigator);
	return <StyleProvider>
		<Navigator />
	</StyleProvider>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
