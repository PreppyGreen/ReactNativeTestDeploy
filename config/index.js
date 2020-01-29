import env from 'react-native-config';
import Reactotron from 'reactotron-react-native';

export const MAPBOX_KEY = env.MAPBOX_KEY;
export const GET_ORDERS =
  'https://avicenna-backendservicespoc-getorders.azurewebsites.net/api/orders';
export const GET_ORDER =
  'https://avicenna-backendservicespoc-getorder.azurewebsites.net/api/order';
export const POST_ORDER =
  'https://avicenna-backendservicespoc-placeorder.azurewebsites.net/api/placeorder';
export const POST_USER =
  'https://avicenna-backendservicespoc-createaccount.azurewebsites.net/api/createaccount';
