import React, { createContext } from 'react';
import { StyleSheet } from 'react-native';
import { TITLE_FONT_SIZE } from './typography';

const styles =  StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
	},
	autoCompleteInputContainer: {
		backgroundColor: 'yellow',
		width: '80%',
	},
	listText: {
		width: '100%',
	},
	title: {
		fontSize: TITLE_FONT_SIZE,
	},
});

export const StyleContext = createContext(styles);

export default function StyleProvider({ children }: any) {
	return <StyleContext.Provider value={styles}>
		{ children }
	</StyleContext.Provider>
}
