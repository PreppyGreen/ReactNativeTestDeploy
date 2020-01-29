import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StyleContext } from '../theme/StyleContext';
import { NavigationStackProp } from 'react-navigation-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { percentageHeight, percentageWidth } from '../theme/utils';
import axios from 'axios';
import { POST_ORDER } from '../config';
import uuid from 'uuid/v4';
import Reactotron from 'reactotron-react-native';
import { OrderType } from 'types/order';

export default function PlaceOrderScreen({
  navigation,
}: {
  navigation: NavigationStackProp;
}) {
  const [loading, setLoading] = useState(false);
  const styleContext = useContext(StyleContext);
  const placeOrder = async () => {
    setLoading(true);
    try {
      const newOrder: OrderType = (
        await axios.post(POST_ORDER, {
          accountId: uuid(),
          patiendId: uuid(),
        })
      ).data;
      navigation.navigate({
        routeName: 'OrderView',
        params: {
          order: newOrder,
        },
      });
      setLoading(false);
    } catch (e) {
      Reactotron.warn('An error occurred when trying to add an order');
      Reactotron.warn(e);
    }
  };
  return (
    <View style={styleContext.container}>
      <TouchableOpacity onPress={placeOrder}>
        <View style={styles.buttonContainer}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Text style={styles.text}>Order medicine</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

function LoadingSpinner() {
  return <ActivityIndicator />;
}
const styles = StyleSheet.create({
  buttonContainer: {
		backgroundColor: 'rgb(65, 137, 234)',
		width: percentageWidth(35),
		height: percentageHeight(4),
		justifyContent: 'center',
		alignItems: 'center'
  },
  text: {
    color: 'white',
  },
});
