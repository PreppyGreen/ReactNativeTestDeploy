import React, { useContext, useState } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { StyleContext } from '../theme/StyleContext';
import { Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { MAPBOX_KEY } from '../config';
import { pharmacyLocationList } from '../pharmacy_list';
MapboxGL.setAccessToken(MAPBOX_KEY);

const UK_COORDINATE = [-3.435973, 55.378052]
export default function MapboxScreen() {
	const styleContext = useContext(StyleContext);
	const [ modalIsOpen, setModalIsOpen ] = useState(false);
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
					.map((coordinate, id) => <Marker
						coordinate={coordinate}
						id={`id-${id}`}
						onPress={() => setModalIsOpen(true)}
					/>) }
			</MapboxGL.MapView>
			<Drawer open={modalIsOpen}
				setOpen={setModalIsOpen}/>
		</View>
	);
}


// This should take a coordinate and return a point on the map view
function Marker({ coordinate, id, onPress }: any) {
	return (
		<MapboxGL.PointAnnotation
			key={id}
			id={id}
			title="Avicenna Pharmacy"
			coordinate={[ coordinate.longitude, coordinate.lattitude ]}
		>
			<Icon name="rocket"
				size={30}
				color="#900"
				onPress={onPress}
			/>
		</MapboxGL.PointAnnotation>
	);
}

function Drawer({ open, setOpen }: {
	open: boolean;
	setOpen: Function;
}) {
	return (
		<View >
			<Modal animationType="slide"
				transparent={true}
				visible={open}
			>
				<View style={styles.modalContent}>
					<Text>Some modal content</Text>
					<Button type="solid"
						title="Close the drawer"
						onPress={() => setOpen(false)}
					/>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	modalContent: {
		marginTop: 200,
		backgroundColor: 'white',
		display: 'flex',
		flex: 1,
		justifyContent: 'space-between',
	}
});
