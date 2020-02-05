import React, { useContext, useState, useEffect } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { View, Text, StyleSheet } from 'react-native';
import { StyleContext } from '../theme/StyleContext';
import LoadingSpinner from '../utils/LoadingSpinner';
import { MedicineType } from '../types/medicine';
import { searchMedicine } from '../utils';
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
  navigation: NavigationStackProp;
}) {
  const styleContext = useContext(StyleContext);
  const barcode: Barcode = navigation.getParam('barcode');
  const [isLoading, setIsLoading] = useState(true);
  const [itemInfo, setItemInfo] = useState(null);

  useEffect(() => {
    // When we get the barcode, we want to make a request to our medicinesearch API
    // If we know what it is - great! Just display it
    // else we'll just say that it's not found
    async function getMedicine() {
      try {
				const { medicines } = await searchMedicine(barcode.data, true);

        if (medicines.length) {
          setItemInfo(medicines[0]);
        } else {
					setItemInfo(null);
				}
				setIsLoading(false)
        Reactotron.log({ medicines });
      } catch (e) {
				Reactotron.log('An error occurred when searching for medicines', e);
      }
    }
    getMedicine();
  }, []);

  const Content = () =>
    isLoading  ? (
      <LoadingSpinner color="blue" />
    ) : itemInfo ? (
      <Text style={styles.bigText}>{ itemInfo.description || itemInfo.name }</Text>
    ) : <Text style={styles.bigText}>
			Not found
		</Text>;

  return (
    <View style={styleContext.container}>
      <Content />
			{ !isLoading && itemInfo && (
				<Button title="Order"
					type="solid"
					onPress={() => Reactotron.log('Do something')}
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
