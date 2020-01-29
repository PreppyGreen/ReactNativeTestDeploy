import env from 'react-native-config';
import Reactotron from 'reactotron-react-native';
Reactotron.log({ env })
export const MAPBOX_KEY = env.MAPBOX_KEY;
export const API = env.API;
