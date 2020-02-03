import { AsyncStorage } from "react-native";
import { ACCOUNT_ID, PATIENT_ID } from "../constants";
import { POST_USER, PHARMACY_ID, GET_ORDERS } from '../config';
import axios from 'axios';
import Reactotron from 'reactotron-react-native';
import { OrderType } from '../types/order';

export async function hasAccountDetailsInStorage() {
	const accountId = await AsyncStorage.getItem(ACCOUNT_ID);
	const patientId = await AsyncStorage.getItem(PATIENT_ID);

	return accountId && patientId;
}

export async function createAccount() {
	const user = (
		await axios.post(POST_USER, {
			email: '',
			pharmacyId: PHARMACY_ID,
		})
	).data;
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
	try {
		await AsyncStorage.multiRemove([ACCOUNT_ID, PATIENT_ID]);
	} catch (e) {
		Reactotron.log('Error: could not remove account details', e);
	}
}

export async function fetchOrders(): Promise<OrderType[]> {
	try {
		const accountId = await AsyncStorage.getItem(ACCOUNT_ID);
		const patientId = await AsyncStorage.getItem(PATIENT_ID);
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
