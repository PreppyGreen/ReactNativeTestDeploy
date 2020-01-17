/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Analytics from 'appcenter-analytics';

AppRegistry.registerComponent(appName, () => App);

Analytics.trackEvent("App loaded");

Analytics.trackEvent('Video clicked', { Category: 'Music', FileName: 'favorite.avi' });
