import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { StyleContext } from '../theme/StyleContext';
import { NavigationStackProp } from 'react-navigation-stack';

export default function PlaceOrderScreen({ navigation }: {
	navigation: NavigationStackProp
}) {
  const styleContext = useContext(StyleContext);
  return (
    <View style={styleContext.container}>
      <Button
        title="Order medicine"
        onPress={() => navigation.navigate('OrderPlaced')}
      />
    </View>
  );
}
