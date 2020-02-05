import AsyncStorage from '@react-native-community/async-storage'
import { ACCOUNT_ID, PATIENT_ID, COLLECTED } from "../constants";
import { POST_USER, PHARMACY_ID, GET_ORDERS, GET_ORDER, GET_MEDICINE, GET_MEDICINE_V2 } from '../config';
import axios from 'axios';
import Reactotron from 'reactotron-react-native';
import { OrderType } from '../types/order';
import { MedicineResponseType } from '../types/medicine';
import uuid from 'uuid/v4';

export async function hasAccountDetailsInStorage() {
	const { accountId, patientId } = await getAccountDetails();
	return accountId && patientId;
}

export async function getAccountDetails() {
	const [accountId, patientId] = await Promise.all([
		AsyncStorage.getItem(ACCOUNT_ID),
		AsyncStorage.getItem(PATIENT_ID)
	])

	return {
		accountId,
		patientId
	}
}

export async function createAccount() {
	Reactotron.log('Creating account')
	const user = (
		await axios.post(POST_USER, {
			email: `${uuid().replace('-', '')}@example.com`,
			pharmacyId: PHARMACY_ID,
		})
	).data;
	Reactotron.log({ user });
	await storeAccount(user);
}

async function storeAccount(user: any) {
	try {
		await AsyncStorage.multiSet([
			[ACCOUNT_ID, user.account.id],
			[PATIENT_ID, user.patient.id],
		]);
	} catch (e) {
		Reactotron.log('Error storing account in storage:', e)
	}
}

export async function removeAccount() {
	Reactotron.log('Removing account')
	try {
		await AsyncStorage.multiRemove([ACCOUNT_ID, PATIENT_ID]);
	} catch (e) {
		Reactotron.log('Error: could not remove account details', e);
	}
}

export async function fetchOrders(): Promise<OrderType[]> {
	try {
		const { accountId, patientId } = await getAccountDetails();
		const orders = (
			await axios.post(GET_ORDERS, {
				accountId,
				patientId,
			})
		).data;
		return orders;
	} catch (e) {
		Reactotron.warn('Could not fetch orders.');
		Reactotron.warn(e);
		return [];
	}
}

export async function fetchOrder(orderId: string): Promise<OrderType> {
	try {
		const newestOrder: OrderType = (await axios.get(`${GET_ORDER}/${orderId}`)).data;
		return newestOrder;
	} catch (e) {
		Reactotron.log('An error occurred when trying to fetch order', e);
	}
}

export function separateOrders(orders) {
	const activeOrders = [],
		fulfilledOrders = [];
	for (const order of orders) {
		if (order.orderStatus == COLLECTED) {
			fulfilledOrders.push(order);
		} else {
			activeOrders.push(order);
		}
	}
	return {
		activeOrders, fulfilledOrders
	}
}

export async function searchMedicine(searchString: string, barcodeScan: boolean): Promise<MedicineResponseType> {
	Reactotron.log('Searching medicine with the following payload', { searchString, barcodeScan });
	try {
		const { data } = await axios.post(GET_MEDICINE_V2, {
			searchString,
			barcodeScan,
		 });
		return data;
	} catch (e) {
		Reactotron.log('Error occurred when trying to search medicines', e);
		throw Error(e);
	}
}
