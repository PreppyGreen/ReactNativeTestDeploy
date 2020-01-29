/**
 * @format
 */

// Add Reactotron which is essentially like having the chrome dev tools for react native with a lower performance hit.
if (__DEV__) {
	import('./ReactotronConfig')
		.then(() => console.log('Reactotron Configured'))
}

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Analytics from 'appcenter-analytics';

AppRegistry.registerComponent(appName, () => App);

Analytics.trackEvent("App loaded");

Analytics.trackEvent('Video clicked', { Category: 'Music', FileName: 'favorite.avi' });
