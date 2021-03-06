import { NativeModules } from 'react-native';

NativeModules.ReactLocalization = {
  language: 'en',
};

// TODO: remove these mocks!
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    /* Buttons */
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  };
});

jest.mock('react-native-gesture-handler/DrawerLayout', () => {
  return {
    Directions: null,
  };
});

jest.mock('@react-native-mapbox-gl/maps', () => {
	return {
		StyleURL: {
			Street: null
		},
		setAccessToken: () => {},
	}
})

jest.mock('react-native-push-notification', () => {
	return {
		configure: () => {}
	};
})

jest.mock('react-native-background-timer', () => {
	return {

	}
})

jest.mock('@react-native-community/push-notification-ios', () => {
	return {

	}
})

jest.mock('@react-native-community/async-storage', () => {
	return {

	}
})
