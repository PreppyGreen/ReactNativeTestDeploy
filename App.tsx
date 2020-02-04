import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
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
} from './proof-of-concept-screens';
import StyleProvider from './theme/StyleContext';
import Reactotron from 'reactotron-react-native';
import { hasAccountDetailsInStorage, createAccount } from './utils';

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
  },
  {
    initialRouteName: 'Home',
  },
);

export default function App() {
  useEffect(() => {
    async function setUserDetails() {
      try {
				//create an account if there isn't one;
				const hasAccount = await hasAccountDetailsInStorage();
        if (!hasAccount) {
					await createAccount();
				}
      } catch (e) {
        Reactotron.warn('Could not save account details to async storage');
        Reactotron.warn(e);
      }
    }
    setUserDetails();
  }, []);
  const Navigator = createAppContainer(AppNavigator);
  return (
    <StyleProvider>
      <Navigator />
    </StyleProvider>
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
