import React, { useContext } from 'react'
import { NavigationStackProp } from 'react-navigation-stack';
import { View, Text } from 'react-native';
import { StyleContext } from '../theme/StyleContext';

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
	return (
		<View style={styleContext.container}>
			<Text>Barcode value: { barcode.data }</Text>
			<Text>Barcode type: { barcode.type }</Text>
		</View>
	)
}
