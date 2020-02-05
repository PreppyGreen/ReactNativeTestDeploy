import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { percentageHeight, percentageWidth } from '../theme/utils';
import { NavigationStackProp } from 'react-navigation-stack';
import axios from 'axios';
import { POST_ORDER } from '../config';
import Reactotron from 'reactotron-react-native';
import { OrderType } from 'types/order';
import { getAccountDetails } from '../utils';
import { Button } from 'react-native-elements';
import LoadingSpinner from '../utils/LoadingSpinner';
import TextSearch from './TextSearchScreen';
import TextSearchScreen from './TextSearchScreen';

export default function PlaceOrderScreen({
  navigation,
}: {
  navigation: NavigationStackProp;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <KeyboardAvoidingView style={styles.container}>
			<TextSearchScreen navigation={navigation}/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingTop: percentageHeight(5),
	},
  buttonContainer: {
		backgroundColor: 'rgb(65, 137, 234)',
		width: percentageWidth(35),
		height: percentageHeight(4),
		justifyContent: 'center',
		alignItems: 'center'
  },
  text: {
    color: 'white',
  },
});
