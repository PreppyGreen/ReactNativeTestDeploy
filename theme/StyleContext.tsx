import React, { createContext } from 'react';
import { StyleSheet } from 'react-native';

const styles =  StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const StyleContext = createContext(styles);

export default function StyleProvider({ children }: any) {
	return <StyleContext.Provider value={styles}>
		{ children }
	</StyleContext.Provider>
}
