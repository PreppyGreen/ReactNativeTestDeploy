import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { StyleContext } from '../theme/StyleContext';
import { NavigationStackProp } from 'react-navigation-stack';
import Reactotron from 'reactotron-react-native';
import { ORDERS_API } from '../config';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { percentageHeight } from '../theme/utils';

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
	const [ orders, setOrders ] = useState([]);
	useEffect(() => {
		async function fetchOrders() {
			try {
				const orders = (await axios.get(ORDERS_API)).data;
				setOrders(orders);
			} catch (e) {
				Reactotron.warn('Could not fetch orders.');
				Reactotron.warn(e);
			}
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
        <View style={{
					flex: 1
				}}>
          <Text style={styleContext.title}>Active orders</Text>
					<FlatList
						data={orders}
						renderItem={({ item }) => <Order order={item} />}
						keyExtractor={item => item.orderId}
					/>
        </View>
        <View style={{
					flex: 1
				}}>
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

function Order({
	order
}:any) {
	const timeStamp = new Date(order.orderDt).toUTCString();
	return <View style={{
		padding: percentageHeight(2.5),
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: 'lightblue',
		borderWidth: 2,
		borderRadius: 2,
		borderColor: 'black'
	}}>
		<Text>Ordered: { timeStamp }</Text>
	</View>
}
