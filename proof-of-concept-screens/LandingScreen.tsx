import React, { useContext, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { StyleContext } from '../theme/StyleContext';
import { NavigationStackProp } from 'react-navigation-stack';
import Reactotron from 'reactotron-react-native';
import { MAPBOX_KEY, API} from '../config';
import axios from 'axios';
Reactotron.log({ MAPBOX_KEY, API })

/*
 - Make a network request to retrieve the list of medicines
 - Display the list of orders and stuff in a list
 - Have a button that navigates to the screen where you can place a order
*/
export default function LandingScreen({
  navigation,
}: {
  navigation: NavigationStackProp;
}) {
	const styleContext = useContext(StyleContext);
	useEffect(() => {
		async function fetchOrders() {
			//Fetch orders
			const orders = await axios.get(`${API}/orders`)
			Reactotron.log('The orders are', { orders });
		}
		fetchOrders();
	}, [])
  return (
    <SafeAreaView style={styleContext.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={styleContext.title}>Active orders</Text>
          {/* TODO: ADD A LIST HERE  */}
        </View>
        <View>
          <Text style={styleContext.title}>Fulfilled orders</Text>
          {/* TODO: ADD A LIST HERE */}
        </View>

        <Button
          title="Place order"
          type="solid"
          onPress={() => navigation.navigate('PlaceOrder')}
        />
      </View>
    </SafeAreaView>
  );
}
