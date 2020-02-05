import React, { useContext } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-elements';
import { StyleContext } from '../theme/StyleContext';
import { NavigationStackProp } from 'react-navigation-stack';
import { percentageHeight } from '../theme/utils';
import { ACCOUNT_ID, PATIENT_ID } from '../constants';
import Reactotron from 'reactotron-react-native';
import { removeAccount, createAccount } from '../utils';

export default HomeScreen;

function HomeScreen({ navigation }: { navigation: NavigationStackProp }) {
  const styleContext = useContext(StyleContext);
  return (
    <View
      style={styleContext.container}
      testID="app-home"
      accessibilityLabel="app-home">
      <ViewWithSpacer>
        <Button
          title="Go to landing page"
          type="solid"
          onPress={() => navigation.navigate('Landing')}
        />
      </ViewWithSpacer>
      <ViewWithSpacer space={5}>
        <Button
					title="Create an account"
					type="solid"
					onPress={() => {
						navigation.navigate('Registration');
					}}
				/>
      </ViewWithSpacer>
      <ViewWithSpacer space={5}>
        <Button
          title="Reset account details"
          type="solid"
          onPress={async () => {
            await removeAccount();
            await createAccount();
          }}
        />
      </ViewWithSpacer>

      <Button
        title="Go to the details screen"
        type="outline"
        testID="go-to-details-button"
        accessibilityLabel="go-to-details-button"
        onPress={() =>
          navigation.navigate('Details', {
            itemId: 123,
            otherParam: 'anything that you want here',
          })
        }
      />
      <Button
        title="Go to the example page with text autocomplete"
        type="outline"
        testID="go-to-text-autocomplete-page"
        accessibilityLabel="go-to-text-autocomplete-page"
        onPress={() => navigation.navigate('TextAutoComplete')}
      />
      <Button
        title="Go to the mapbox screen"
        type="outline"
        testID="go-to-mapbox-screen-button"
        accessibilityLabel="go-to-mapbox-screen-button"
        onPress={() => navigation.navigate('Mapbox')}
      />
      <Button
        title="Go to the calendar screen"
        type="outline"
        testID="go-to-calendar-screen-button"
        accessibilityLabel="go-to-calendar-screen-button"
        onPress={() => navigation.navigate('Calendar')}
      />
      <Button
        title="Go to the agenda screen"
        type="outline"
        testID="go-to-agenda-screen-button"
        accessibilityLabel="go-to-agenda-screen-button"
        onPress={() => navigation.navigate('Agenda')}
      />
      <Button
        title="Go to the slider screen"
        type="outline"
        testID="go-to-slider-screen"
        accessibilityLabel="go-to-slider-screen"
        onPress={() => navigation.navigate('Slider')}
      />
      <Button
        title="Go to the barcode scanner screen"
        type="outline"
        testID="go-to-barcode-screen"
        accessibilityLabel="go-to-barcode-screen"
        onPress={() => navigation.navigate('BarcodeScanner')}
      />
    </View>
  );
}
HomeScreen.navigationOptions = {
  title: 'Home screen',
};

async function clearAccountDetails() {
  try {
    await AsyncStorage.multiRemove([ACCOUNT_ID, PATIENT_ID]);
  } catch (e) {
    Reactotron.log('Error removing account details:', e);
  }
}

function ViewWithSpacer({ children, space }: {
	children: any;
	space?: any
}) {
  return <View style={{ marginBottom: percentageHeight(space || 1) }}>{children}</View>;
}
