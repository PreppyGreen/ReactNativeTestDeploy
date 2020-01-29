import React, { useEffect } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
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
} from './proof-of-concept-screens';
import StyleProvider from './theme/StyleContext';
import uuid from 'uuid/v4';
import Reactotron from 'reactotron-react-native';
import axios from 'axios';
import { POST_USER } from './config';

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
  },
  {
    initialRouteName: 'Home',
  },
);

export default function App() {
  useEffect(() => {
    async function setUserDetails() {
      try {
				//create an account;
				const user = (await axios.post(POST_USER, { email: '' })).data;
        await AsyncStorage.multiSet([
          ['accountId', user.account.id],
          ['patientId', user.patient.id],
        ]);
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
