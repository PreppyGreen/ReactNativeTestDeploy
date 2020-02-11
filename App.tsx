import React from 'react';
import { StyleSheet, View, TouchableOpacity  } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  HomeScreen,
  TextAutoCompleteScreen,
  DetailsScreen,
  MapboxScreen,
  CalendarScreen,
  AgendaScreen,
	SliderScreen,
} from './screens';
import {
  LandingScreen,
  PlaceOrderScreen,
  OrderPlacedScreen,
  OrderViewScreen,
	BarcodeScannerScreen,
	BarcodeValueScreen,
	RegistrationScreen,
	ConfirmMedicineOrderScreen,
	NotificationScreen,
} from './proof-of-concept-screens';
import StyleProvider from './theme/StyleContext';
import { IOSNotifications } from './AzureNotifications';

console.disableYellowBox = true; //Comment this out if you want to see the yellow warnings
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    TextAutoComplete: TextAutoCompleteScreen,
    Mapbox: MapboxScreen,
    Calendar: CalendarScreen,
    Agenda: AgendaScreen,
    Slider: SliderScreen,
    Landing: LandingScreen,
    PlaceOrder: PlaceOrderScreen,
    OrderPlaced: OrderPlacedScreen,
		OrderView: OrderViewScreen,
		BarcodeScanner: BarcodeScannerScreen,
		BarcodeValue: BarcodeValueScreen,
		Registration: RegistrationScreen,
		ConfirmMedicine: ConfirmMedicineOrderScreen,
		Notification: NotificationScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default function App() {
  const Navigator = createAppContainer(AppNavigator);
  return (
		<IOSNotifications>
			<StyleProvider>
				<Navigator />
			</StyleProvider>
		</IOSNotifications>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
