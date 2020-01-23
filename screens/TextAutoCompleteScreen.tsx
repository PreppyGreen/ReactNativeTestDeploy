import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleContext } from '../theme/StyleContext';
import Autocomplete from 'react-native-autocomplete-input';

export default function TextAutoCompleteScreen() {
	const styleContext = useContext(StyleContext);
	const [ query, setQuery ] = useState('');
  const data = filterData(exampleData)(query);
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
		return data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
	}
}

const exampleData = [
	'hello',
	'world',
	'foo',
	'bar',
];
