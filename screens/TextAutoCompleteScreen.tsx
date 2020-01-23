import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleContext } from '../theme/StyleContext';
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';
import { debounce } from 'lodash';

const MIN_SEARCH_LENGTH = 1;
export default function TextAutoCompleteScreen() {
	const styleContext = useContext(StyleContext);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ data, setData ] = useState([]);
	const [ isSearching, setIsSearching ] = useState(false);

	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	useEffect(
		() => {
			if (debouncedSearchTerm) {
				setIsSearching(true);
				searchCocktails(debouncedSearchTerm)
					.then((cocktails: any) => {
						setIsSearching(false);
						setData(cocktails);
					})
			} else {
				setData([]);
			}
		},
		[debouncedSearchTerm]
	)

  return (
		<View style={styleContext.container}>
			<Autocomplete
				containerStyle={{
					minWidth: '50%',
				}}
				data={data}
				defaultValue={searchTerm}
				onChangeText={setSearchTerm}
				renderItem={({ item, i }: any) => (
					<TouchableOpacity onPress={() => setSearchTerm(item)}>
						<Text style={styleContext.listText} key={item}>{ item }</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}
// This api searches by the first letter, additional letters will just return an empty response
const api = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f';
async function searchCocktails(search: string): Promise<string[]> {
	try {
		const res = await axios.get(`${ api }=${ search }`);
		return res.data.drinks.map((drink: any) => drink.strDrink);
	} catch (e) {
		return [];
	}
}


	function useDebounce(value: any, delay: number) {
		const [ debouncedValue, setDebouncedValue ] = useState(value);

		useEffect(
			() => {
				const handler = setTimeout(() => {
					setDebouncedValue(value);
				}, delay);

				return () => {
					clearTimeout(handler);
				}
			},
			[ value ]
		);

		return debouncedValue;
	}
