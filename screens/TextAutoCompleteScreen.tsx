import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleContext } from '../theme/StyleContext';
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';

const api = 'https://jsonplaceholder.typicode.com/todos';
export default function TextAutoCompleteScreen() {
	const styleContext = useContext(StyleContext);
	const [ query, setQuery ] = useState('');
	const [ exampleData, setExampleData ] = useState([]);
	const data = filterData(exampleData)(query);

	// Fetch a bunch of data when this component loads for the first time
	useEffect(() => {
		async function getAndSetExampleData() {
			const res = await axios.get(api);
			const newExampleData = res.data.map((item: any) => item.title);
			setExampleData(newExampleData);
		}
		getAndSetExampleData()
	}, []);

  return (
		<View style={styleContext.container}>
			<Autocomplete
				containerStyle={{
					minWidth: '50%',
				}}
				data={data}
				defaultValue={query}
				onChangeText={setQuery}
				renderItem={({ item, i }: any) => (
					<TouchableOpacity onPress={() => setQuery(item)}>
						<Text style={styleContext.listText} key={item}>{ item }</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}

function filterData(data: string[]) {
	return function filter(query: string) {
		return data.filter(item => item.toLowerCase()
			.includes(query.toLowerCase()));
	}
}
