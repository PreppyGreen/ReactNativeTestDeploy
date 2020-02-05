import React, { useState } from 'react';
import {	ScrollView, View, Text, StyleSheet, TextInput } from "react-native";
import { Button } from 'react-native-elements';
import { percentageWidth, percentageHeight } from '../theme/utils';
import Reactotron from 'reactotron-react-native';

export default function RegistrationScreen() {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ address1, setAddress1 ] = useState('');
	const [ address2, setAddress2 ] = useState('');
	const [ address3, setAddress3 ] = useState('');
	const [ city, setCity ] = useState('');
	const [ postcode, setPostcode ] = useState('');
	const [ dob, setDob ] = useState('');
	const [ phone, setPhone ] = useState('');

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Label label="First name">
				<TextInput style={styles.textInput} textContentType="name" value={firstName} onChangeText={setFirstName}/>
			</Label>
			<Label label="Last name" >
				<TextInput style={styles.textInput} textContentType="name" value={lastName} onChangeText={setLastName}/>
			</Label>
			<Label label="Address line 1" >
				<TextInput style={styles.textInput} textContentType="streetAddressLine1" value={address1} onChangeText={setAddress1}/>
			</Label>
			<Label label="Address line 2">
				<TextInput style={styles.textInput} textContentType="streetAddressLine2" value={address2} onChangeText={setAddress2}/>
			</Label>
			<Label label="Address line 3">
				<TextInput style={styles.textInput} value={address3} onChangeText={setAddress3} />
			</Label>
			<Label label="City">
				<TextInput style={styles.textInput} textContentType="addressCity" value={city} onChangeText={setCity} />
			</Label>
			<Label label="Postcode">
				<TextInput style={styles.textInput} textContentType="postalCode" value={postcode} onChangeText={setPostcode} />
			</Label>
			<Label label="Date of birth (DD/MM/YYY)">
				<TextInput style={styles.textInput} value={dob} onChangeText={setDob} />
			</Label>
			<Label label="Phone number">
				<TextInput style={styles.textInput} textContentType="telephoneNumber" value={phone} onChangeText={setPhone}/>
			</Label>

			<Button title="Confirm"
				type="solid"
				onPress={() => Reactotron.log('do something')}
			/>
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
