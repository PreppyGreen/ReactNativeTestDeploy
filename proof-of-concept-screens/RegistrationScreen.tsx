import React from 'react';
import {	ScrollView, View, Text, StyleSheet, TextInput } from "react-native";
import { percentageWidth, percentageHeight } from '../theme/utils';

export default function RegistrationScreen() {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Label label="First name">
				<TextInput style={styles.textInput} textContentType="name"/>
			</Label>
			<Label label="Last name" >
				<TextInput style={styles.textInput} textContentType="name"/>
			</Label>
			<Label label="Address line 1" >
				<TextInput style={styles.textInput} textContentType="streetAddressLine1"/>
			</Label>
			<Label label="Address line 2">
				<TextInput style={styles.textInput} textContentType="streetAddressLine2"/>
			</Label>
			<Label label="Address line 3">
				<TextInput style={styles.textInput} />
			</Label>
			<Label label="City">
				<TextInput style={styles.textInput} textContentType="addressCity"/>
			</Label>
			<Label label="Postcode">
				<TextInput style={styles.textInput} textContentType="postalCode"/>
			</Label>
			<Label label="Date of birth (DD/MM/YYY)">
				<TextInput style={styles.textInput} />
			</Label>
			<Label label="Phone number">
				<TextInput style={styles.textInput} textContentType="telephoneNumber"/>
			</Label>


		</ScrollView>
	);
}
function Label({ label, children }: {
	label: string;
	children: any;
}) {
	return <View style={styles.labelContainer}>
			<Text style={styles.labelText}>{ label }</Text>
			{ children }
		</View>
}
const styles = StyleSheet.create({
	container: {
		// flex: 1,
		justifyContent: 'flex-start',
		marginTop: percentageHeight(5),
		paddingBottom: percentageHeight(10),
		alignItems: 'center'
	},
	textInput: {
		width: percentageWidth(75),
		borderWidth: 2,
		borderColor: 'black',
	},
	labelText: {
		fontWeight: 'bold',
		fontSize: 20
	},
	labelContainer: {
		marginBottom: percentageHeight(5),
	}
});
