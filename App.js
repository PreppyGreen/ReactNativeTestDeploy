import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Button } from 'react-native-elements';

function HomeScreen({ navigation }: any) {
	return (
		<View style={styles.container} testID="app-root" accessibilityLabel="app-root">
			<Text>Home Screen</Text>
			<Button title="Go to the details screen"
				type="outline"
				testID="go-to-details-button"
				accessibilityLabel="go-to-details-button"
				onPress={() => navigation.navigate('Details', {
					itemId: 123,
					otherParam: 'anything that you want here',
				})}
			/>
		</View>
	);
}
HomeScreen.navigationOptions = {
	title: 'Home screen'
}

function DetailsScreen({ navigation }: any) {
	return (
		<View style={styles.container}>
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
const AppNavigator = createStackNavigator({
	Home: HomeScreen,
	Details: DetailsScreen,
}, {
	initialRouteName: 'Home'
});

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
