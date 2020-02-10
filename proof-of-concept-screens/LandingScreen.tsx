import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-elements';
import { StyleContext } from '../theme/StyleContext';
import { NavigationStackProp } from 'react-navigation-stack';
import Reactotron from 'reactotron-react-native';
import { FlatList } from 'react-native-gesture-handler';
import { percentageHeight } from '../theme/utils';
import { OrderType } from '../types/order';
// import PushNotification from '../config/notifications';
import BackgroundTimer from 'react-native-background-timer';
import { READY_FOR_COLLECTION } from '../constants';
import { fetchOrders, separateOrders } from '../utils';

export default function LandingScreen({
  navigation,
}: {
  navigation: NavigationStackProp;
}) {
  const styleContext = useContext(StyleContext);
  const [orders, setOrders]: [OrderType[], Function] = useState([]);

  // Get the list of orders for this account
  useEffect(() => {
    Reactotron.log('On the landing screen');
    fetchOrders().then(async o => {
      await AsyncStorage.setItem('orders', JSON.stringify(o));
      setOrders(o);
    });
  }, []);

  // Setup a background task that will notify the users if any orders are ready to collect;
  useEffect(() => {
    //Only run this in dev mode
    if (__DEV__) {
      backgroundRunner();
    }
  }, []);

  //Sort the orders into active and fulfilled(collected);
  const { activeOrders, fulfilledOrders } = separateOrders(orders);

  return (
    <SafeAreaView style={styleContext.container}>
      <Button
        title="Refresh"
        type="solid"
        onPress={() => {
          navigation.replace('Landing');
        }}
      />
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
          onPress={() => navigation.navigate('PlaceOrder', { items: [] })}
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
        <Text>ID: {order.id}</Text>
        <Text
          style={{
            fontWeight: 'bold',
          }}>
          Status: {order.orderStatus}
        </Text>
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

async function setOrdersInStorage(orders) {
  await AsyncStorage.setItem('orders', JSON.stringify(orders));
}
async function getOrdersInStorage() {
  return JSON.parse(await AsyncStorage.getItem('orders'));
}

const POLLING_INTERVAL = 5000;
function backgroundRunner() {
	// Pretty nasty - but should stop multiple backgroundRunner's being spawned
	if (globalThis.runningBackgroundTask) {
		return;
	}
  return BackgroundTimer.runBackgroundTimer(async () => {
		globalThis.runningBackgroundTask = true;
    Reactotron.log('Running background check');
    const oldOrders = await getOrdersInStorage();
    const newOrders = await fetchOrders();

    setOrdersInStorage(newOrders); //Store the orders in async storage because we can't read the latest orders in state.
    // if (hasANewOrder(oldOrders, newOrders)) {
    //   return PushNotification.localNotification({
    //     title: 'Order update',
    //     message: 'Your order is ready to collect!',
    //   });
    // }
  }, POLLING_INTERVAL);
}

function hasANewOrder(oldOrders, newOrders) {
  // Loop through the latest orders and compare to previous orders
  for (const order of newOrders) {
    const prevOrder = oldOrders.find(o => o.id === order.id);
    // This is the first time we've ordered anything
    if (!prevOrder && order.orderStatus == READY_FOR_COLLECTION) {
      return true;
    } else if (
      order.orderStatus == READY_FOR_COLLECTION &&
      prevOrder.orderStatus != order.orderStatus
    ) {
      return true;
    }
  }
  return false;
}
