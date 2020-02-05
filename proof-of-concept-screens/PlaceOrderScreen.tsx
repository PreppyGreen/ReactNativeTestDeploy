import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import TextSearch from './TextSearchScreen';
import { percentageHeight, percentageWidth, keyboardAvoidingBehaviour } from '../theme/utils';

export default function PlaceOrderScreen({
  navigation,
}: {
  navigation: NavigationStackProp;
}) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={keyboardAvoidingBehaviour}>
			<TextSearch navigation={navigation}/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingTop: percentageHeight(5),
	},
  buttonContainer: {
		backgroundColor: 'rgb(65, 137, 234)',
		width: percentageWidth(35),
		height: percentageHeight(4),
		justifyContent: 'center',
		alignItems: 'center'
  },
  text: {
    color: 'white',
  },
});
