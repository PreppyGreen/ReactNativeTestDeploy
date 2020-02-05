import React, { useState } from 'react';
import {	ScrollView, View, Text, StyleSheet, TextInput, Picker, KeyboardAvoidingView } from "react-native";
import { Button } from 'react-native-elements';
import { percentageWidth, percentageHeight } from '../theme/utils';
import Reactotron from 'reactotron-react-native';
import { createAccount } from '../utils';
import { NavigationStackProp } from 'react-navigation-stack';

export default function RegistrationScreen({
	navigation
}: {
	navigation: NavigationStackProp;
}) {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ address1, setAddress1 ] = useState('');
	const [ address2, setAddress2 ] = useState('');
	const [ address3, setAddress3 ] = useState('');
	const [ city, setCity ] = useState('');
	const [ postcode, setPostcode ] = useState('');
	const [ dateOfBirth, setdateOfBirth ] = useState('');
	const [ phoneNumber, setPhoneNumber ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ title, setTitle ] = useState('');

	return (
		<KeyboardAvoidingView behavior="padding" enabled>
		<ScrollView contentContainerStyle={styles.container}>
			<Label label="First name">
				<TextInput style={styles.textInput} textContentType="name" value={firstName} onChangeText={setFirstName}/>
			</Label>
			<Label label="Last name" >
				<TextInput style={styles.textInput} textContentType="name" value={lastName} onChangeText={setLastName}/>
			</Label>
			<Label label="Title">
				<Picker style={styles.textInput} selectedValue={title} onValueChange={setTitle}>
					{ titles.map(t => (
						<Picker.Item label={t} value={t} />
					))}
				</Picker>
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
			<Label label="Date of birth (YYYY-MM-DD)">
				<TextInput style={styles.textInput} value={dateOfBirth} onChangeText={setdateOfBirth} />
			</Label>
			<Label label="Phone number">
				<TextInput style={styles.textInput} textContentType="telephoneNumber" value={phoneNumber} onChangeText={setPhoneNumber}/>
			</Label>
			<Label label="Email address">
				<TextInput style={styles.textInput} textContentType="emailAddress" value={email} onChangeText={setEmail}/>
			</Label>

			<Button title="Confirm"
				type="solid"
				onPress={() => confirmAccount()}
			/>
		</ScrollView>
		</KeyboardAvoidingView>
	);

	async function confirmAccount() {
		try {
			await createAccount({
				email, title, firstName, lastName, address1, address2, address3, city, postcode, dateOfBirth, phoneNumber
			});
			navigation.navigate('Landing');
		} catch (e) {
			Reactotron.log('Could not create an account', e);
		}
	}
}

const titles = [
	'', 'Mr', 'Mrs', 'Miss', 'Ms', 'Mx', 'Sir', 'Dr', 'Lady', 'Lord',
]


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
