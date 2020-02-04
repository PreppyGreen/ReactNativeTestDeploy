import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { percentageHeight, percentageWidth } from '../theme/utils';
import { NavigationStackProp } from 'react-navigation-stack';
import axios from 'axios';
import { POST_ORDER } from '../config';
import Reactotron from 'reactotron-react-native';
import { OrderType } from 'types/order';
import { getAccountDetails } from '../utils';
import { Button } from 'react-native-elements';
import LoadingSpinner from '../utils/LoadingSpinner';

export default function PlaceOrderScreen({
  navigation,
}: {
  navigation: NavigationStackProp;
}) {
  const [loading, setLoading] = useState(false);
  const placeOrder = async () => {
    setLoading(true);
    try {
			const { accountId, patientId } = await getAccountDetails();
			Reactotron.log({ accountId, patientId });
      const newOrder: OrderType = (
        await axios.post(POST_ORDER, {
          accountId,
          patientId,
        })
      ).data;
      navigation.navigate('OrderView', {
          order: newOrder,
      });
      setLoading(false);
    } catch (e) {
      Reactotron.warn('An error occurred when trying to add an order');
      Reactotron.warn(e);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={placeOrder}>
        <View style={styles.buttonContainer}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Text style={styles.text}>Order medicine</Text>
          )}
        </View>
      </TouchableOpacity>
			<Button title="Scan barcode"
				type="solid"
				onPress={() => navigation.navigate('BarcodeScanner')}
			/>
			<Button title="Search by name"
				type="solid"
				onPress={() => navigation.navigate('TextSearch')}
			/>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: percentageHeight(35),
		paddingBottom: percentageHeight(35),
	},
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
