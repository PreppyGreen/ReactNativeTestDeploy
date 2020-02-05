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
export const PHARMACY_ID = 'pha-9009eb99-59b2-49a6-9f32-2ec5cf5ca9f0';
export const GET_MEDICINE =
	'https://avicenna-backendservicespoc-medicinesearch.azurewebsites.net/api/medicinesearch';
export const GET_MEDICINE_V2 =
	'https://avicenna-backendservicespoc-medicinesearch2.azurewebsites.net/api/medicinesearch2';
