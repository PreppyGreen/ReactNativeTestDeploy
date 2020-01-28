import React, { useContext } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleContext } from '../theme/StyleContext';
import { percentageWidth, percentageHeight } from '../theme/utils';
import { Button } from 'react-native-elements';
import { NavigationStackProp } from 'react-navigation-stack';

export default function OrderPlacedScreen({
  navigation,
}: {
  navigation: NavigationStackProp;
}) {
  const styleContext = useContext(StyleContext);

  return (
    <View style={styleContext.container}>
      <View style={{ flex: 2, justifyContent: 'flex-end' }}>
        <Icon name="check-circle" size={percentageWidth(50)} color="#39C700" />
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: percentageHeight(10) }}>
        <Button
          title="Check progress of order"
          type="solid"
          onPress={() => {
            //Should navigate to the order progress screen
            navigation.navigate('OrderView');
          }}
        />
      </View>
    </View>
  );
}
