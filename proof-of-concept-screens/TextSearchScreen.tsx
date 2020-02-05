import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { searchMedicine, makeOrder } from '../utils';
import { MedicineResponseType } from '../types/medicine';
import { percentageHeight, percentageWidth } from '../theme/utils';
import { Button } from 'react-native-elements';
import { NavigationStackProp } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import reactotron from 'reactotron-react-native';

const DEBOUNCE_DELAY = 500;
const MIN_LENGTH = 3;

export default function TextSearchScreen({
  navigation,
}: {
	navigation: NavigationStackProp;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(false); //Use this if we want to display a loading spinner whilst searching

  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
	const [isMakingOrder, setIsMakingOrder] = useState(false);
  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length >= MIN_LENGTH) {
      setIsSearching(true);
      searchMedicine(debouncedSearchTerm, false).then(
        (res: MedicineResponseType) => {
          setIsSearching(false);
          setData(res.medicines);
        },
      );
    } else {
      setData([]);
    }
	}, [debouncedSearchTerm]);

	const items = navigation.getParam('items') || [];
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.input}
        />
        <Icon.Button
          name="camera"
					onPress={() => {
						navigation.navigate('BarcodeScanner', { items })
				}}
        />
      </View>
      {isSearching ? (
        <ActivityIndicator color="black" size={40} style={styles.spinner} />
      ) : (
        <FlatList
          contentContainerStyle={{
            borderWidth: 1,
            borderColor: 'black',
          }}
          ListEmptyComponent={null}
          data={data}
          keyboardShouldPersistTaps="always"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => {
                setSearchTerm(item.description || item.name);
                navigation.navigate('BarcodeValue', { items, item });
              }}>
              <Text key={item.gtin}>{item.description || item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.gtin}
        />
      )}
      <Button
        title={`Order ${items.length} item${items.length > 1 ? 's' : ''}`}
				type="solid"
				loading={isMakingOrder}
        onPress={() => {
					completeOrder();
        }}
      />
    </View>
	);

	async function completeOrder() {
		if (!items.length) return;

		setIsMakingOrder(true);
		try {
			const { data: order } = await makeOrder(items);
			navigation.navigate('OrderView', { order });
		} catch (e) {
			reactotron.log('Could not complete order', e);
		}
	}
}

const styles = StyleSheet.create({
  container: {
    marginTop: percentageHeight(20),
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: percentageHeight(1),
    padding: percentageHeight(1),
    width: percentageWidth(75),
  },
  itemText: {},
  input: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    width: percentageWidth(75),
  },
  spinner: {
    marginTop: percentageHeight(5),
  },
  scanButton: {
    flex: 1,
  },
});
function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}
