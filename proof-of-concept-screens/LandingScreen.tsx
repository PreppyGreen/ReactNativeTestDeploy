import React, { useContext } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { StyleContext } from '../theme/StyleContext';
import { NavigationStackProp } from 'react-navigation-stack';

export default function LandingScreen({
  navigation,
}: {
  navigation: NavigationStackProp;
}) {
  const styleContext = useContext(StyleContext);
  return (
    <SafeAreaView style={styleContext.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={styleContext.title}>Active orders</Text>
          {/* TODO: ADD A LIST HERE  */}
        </View>
        <View>
          <Text style={styleContext.title}>Fulfilled orders</Text>
          {/* TODO: ADD A LIST HERE */}
        </View>

        <Button
          title="Place order"
          type="solid"
          onPress={() => navigation.navigate('PlaceOrder')}
        />
      </View>
    </SafeAreaView>
  );
}
