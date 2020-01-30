import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { Button } from 'react-native-elements';
import { StyleContext } from '../theme/StyleContext';
import { NavigationStackProp } from 'react-navigation-stack';
import Reactotron from 'reactotron-react-native';
import { GET_ORDERS } from '../config';
import axios from 'axios';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { percentageHeight } from '../theme/utils';
import { OrderType } from '../types/order';

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
  const [orders, setOrders]: [OrderType[], Function] = useState([]);
  useEffect(() => {
    Reactotron.log('On the landing screen');
    async function fetchOrders() {
      try {
        const accountId = await AsyncStorage.getItem('accountId');
        const patientId = await AsyncStorage.getItem('patientId');
        const orders = (
          await axios.post(GET_ORDERS, {
            accountId,
            patientId,
          })
        ).data;
        setOrders(orders);
      } catch (e) {
        Reactotron.warn('Could not fetch orders.');
        Reactotron.warn(e);
      }
    }
    fetchOrders();
  }, []);
  //TODO: Make this code a bit more dry;
  const activeOrders = orders.filter(o => o.orderStatus != 'Collected');
  const fulfilledOrders = orders.filter(o => o.orderStatus == 'Collected');
  return (
    <SafeAreaView style={styleContext.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text style={styleContext.title}>Active orders</Text>
          <FlatList
            data={activeOrders}
            renderItem={({ item }) => (
              <Order order={item} navigation={navigation} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <Text style={styleContext.title}>Fulfilled orders</Text>
          <FlatList
            data={fulfilledOrders}
            renderItem={({ item }) => (
              <Order order={item} navigation={navigation} />
            )}
            keyExtractor={item => item.id}
          />
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
  order,
  navigation,
}: {
  order: OrderType;
  navigation: NavigationStackProp;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate({
          routeName: 'OrderView',
          params: {
            order,
          },
        });
      }}>
      <View style={styles.orderItem}>
        <Text>ID: { order.id }</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    padding: percentageHeight(2.5),
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'lightblue',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'black',
  },
});
