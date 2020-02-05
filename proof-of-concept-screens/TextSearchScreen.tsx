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
import { searchMedicine } from '../utils';
import { MedicineResponseType } from '../types/medicine';
import { percentageHeight, percentageWidth } from '../theme/utils';
import { Button } from 'react-native-elements';
import { NavigationStackProp } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
const DEBOUNCE_DELAY = 500;
export default function TextSearchScreen({ navigation }: {navigation: NavigationStackProp}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(false); //Use this if we want to display a loading spinner whilst searching

  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);

  useEffect(() => {
    if (debouncedSearchTerm) {
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

  return (
    <View>
      <View style={{ flexDirection: 'row'}}>
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.input}
        />
				<Icon.Button name="camera"
					onPress={() => navigation.navigate('BarcodeScanner')}
				/>

      </View>
      {isSearching ? (
        <ActivityIndicator color="black" size={40} style={styles.spinner} />
      ) : (
        <FlatList
          ListEmptyComponent={null}
          data={data}
          keyboardShouldPersistTaps="always"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => {
								setSearchTerm(item.description || item.name);
								navigation.navigate('BarcodeValue', { item })
							}}>
              <Text key={item.gtin}>{item.description || item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.gtin}
        />
      )}
    </View>
  );
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
		flex: 1
	}
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
