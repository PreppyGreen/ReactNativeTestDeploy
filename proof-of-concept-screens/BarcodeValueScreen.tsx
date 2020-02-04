import React, { useContext, useState, useEffect } from 'react'
import { NavigationStackProp } from 'react-navigation-stack';
import { View, Text, StyleSheet } from 'react-native';
import { StyleContext } from '../theme/StyleContext';
import LoadingSpinner from '../utils/LoadingSpinner';
import axios from 'axios';

type Barcode = {
	data: any;
	type: any;
}
export default function BarcodeValueScreen({
	navigation
}: {
	navigation: NavigationStackProp
}) {
	const styleContext = useContext(StyleContext);
	const barcode: Barcode = navigation.getParam('barcode');
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
	// When we get the barcode, we want to make a request to our medicinesearch API
		// If we know what it is - great! Just display it
		// else we'll want to default it to one of our known ones.
	}, [])

	return (
		<View style={styleContext.container}>
			<LoadingSpinner color="blue"/>
			<Text>Barcode value: { barcode.data }</Text>
			<Text>Barcode type: { barcode.type }</Text>
		</View>
	)
}

const styles = StyleSheet.create({
})
