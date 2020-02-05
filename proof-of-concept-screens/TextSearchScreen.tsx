import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
	ActivityIndicator,
} from 'react-native';
import { searchMedicine } from '../utils';
import { MedicineResponseType } from '../types/medicine';
import { percentageHeight, percentageWidth } from '../theme/utils';

const DEBOUNCE_DELAY = 500;
export default function TextSearchScreen() {
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : null}>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.input}
      />
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
              onPress={() => setSearchTerm(item.description || item.name)}>
              <Text key={item.gtin}>{item.description || item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.gtin}
        />
      )}
    </KeyboardAvoidingView>
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
    width: percentageWidth(75),
  },
  itemText: {},
  input: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'black',
    width: percentageWidth(75),
	},
	spinner: {
		marginTop: percentageHeight(5),
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
