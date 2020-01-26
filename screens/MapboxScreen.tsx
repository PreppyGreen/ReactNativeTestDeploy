import React, { useContext } from 'react';
import { View } from 'react-native';
import { StyleContext } from '../theme/StyleContext';
import { Text } from 'react-native-elements';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { MAPBOX_KEY } from '../config';
MapboxGL.setAccessToken(MAPBOX_KEY);


export default function MapboxScreen() {
	const styleContext = useContext(StyleContext);
	return (
		<View style={styleContext.container}
		>
			<Text>ADD MAPS HERE</Text>
			<MapboxGL.MapView styleURL={MapboxGL.StyleURL.Street}
			/>
		</View>
	);
}
