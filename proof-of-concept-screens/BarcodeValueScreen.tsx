import React, { useContext, useState, useEffect } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { View, Text, StyleSheet } from 'react-native';
import { StyleContext } from '../theme/StyleContext';
import LoadingSpinner from '../utils/LoadingSpinner';
import { MedicineType } from '../types/medicine';
import { searchMedicine, makeOrder } from '../utils';
import Reactotron from 'reactotron-react-native';
import { percentageWidth } from '../theme/utils';
import { Button } from 'react-native-elements';

type Barcode = {
  data: any;
  type: any;
};
export default function BarcodeValueScreen({
  navigation,
}: {
	navigation: NavigationStackProp<{
		barcode: any;
		item: any;
		items: any;
	}>;
}) {
  const styleContext = useContext(StyleContext);
  const barcode: Barcode = navigation.getParam('barcode');
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [makingOrder, setMakingOrder] = useState(false);
	const items = navigation.getParam('items') || [];

  useEffect(() => {
		const itemFromProps = navigation.getParam('item');
		if (itemFromProps) {
			setItem(itemFromProps);
			setIsLoading(false);
		} else {
			getMedicine();
		}
    // When we get the barcode, we want to make a request to our medicinesearch API
    // If we know what it is - great! Just display it
    // else we'll just say that it's not found
    async function getMedicine() {
      try {
        const { medicines } = await searchMedicine(barcode.data, true);

        if (medicines.length) {
          setItem(medicines[0]);
        } else {
          setItem(null);
        }
        setIsLoading(false);
        Reactotron.log({ medicines });
      } catch (e) {
        Reactotron.log('An error occurred when searching for medicines', e);
      }
    }
  }, []);

  async function confirmOrder() {
    setMakingOrder(true);
    try {
      const { data: order } = await makeOrder([
        {
          ...item,
          quantity: 1,
        },
      ]);
      navigation.navigate('OrderView', { order });
    } catch (e) {
      Reactotron.log('Could not place order', e);
    }
  }

  const Content = () =>
    isLoading ? (
      <LoadingSpinner color="blue" />
    ) : item ? (
      <Text style={styles.bigText}>
        {item.description || item.name}
      </Text>
    ) : (
      <Text style={styles.bigText}>Not found</Text>
    );
  return (
    <View style={styleContext.container}>
      <Content />
      {!isLoading && item && (
        <Button
          title="Add to order"
          loading={makingOrder}
          type="solid"
          onPress={() => {
						navigation.navigate('PlaceOrder', { items: [ ...items, item ]})
					}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bigText: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: percentageWidth(5),
  },
});
