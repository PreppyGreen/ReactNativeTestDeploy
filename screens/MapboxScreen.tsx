import React, { useContext } from 'react';
import { View, Image, Alert } from 'react-native';
import { StyleContext } from '../theme/StyleContext';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { MAPBOX_KEY } from '../config';
import { pharmacyLocationList } from '../pharmacy_list';
MapboxGL.setAccessToken(MAPBOX_KEY);

const UK_COORDINATE = [-3.435973, 55.378052]
export default function MapboxScreen() {
	const styleContext = useContext(StyleContext);
	return (
		<View style={styleContext.container}
		>
			<Text>ADD MAPS HERE</Text>
			<MapboxGL.MapView style={{
				height: '100%',
				width: '100%',
			}}
				zoomEnabled={true}
				scrollEnabled={true}
				styleURL={MapboxGL.StyleURL.Street}
			>
				<MapboxGL.Camera centerCoordinate={UK_COORDINATE} zoomLevel={4} />
				{ pharmacyLocationList
					.map((coordinate, id) => <Marker coordinate={coordinate} id={`id-${id}`} />) }
			</MapboxGL.MapView>
		</View>
	);
}


// This should take a coordinate and return a point on the map view
function Marker({ coordinate, id }: any) {
	return (
		<MapboxGL.PointAnnotation
			key={id}
			id={id}
			title="Avicenna Pharmacy"
			coordinate={[ coordinate.longitude, coordinate.lattitude ]}
		>
			<Icon name="rocket" size={30} color="#900" onPress={() => {
				Alert.alert('You just tapped a location');
			}}/>
		</MapboxGL.PointAnnotation>
	);
}
