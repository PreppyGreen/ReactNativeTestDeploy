import { StatusType } from './status';

export type OrderType = {
	id: string;
	accountId: string;
	patientId: string;
	orderDt: string;
	orderStatus: string;
	statusUpdates: StatusType[];
	items: OrderItemType[];
}

export type OrderItemType = {
	orderItemId: string;
	orderStatus: string;
	quantity: number;
	medicineId: string;
}


/*

{
"id": "729b79a7-21b9-4ead-a369-7d38221f037b",
"accountId": "54dc7cc0-0640-4652-adea-f526df7ccc7a",
"patientId": "18757d23-4b28-4b1a-a7ea-e2d081736cd1",
"orderDt": "2020-01-29T09:37:31.1170672Z",
"status": "New",
"statusUpdates": [
{
"statusUpdateDt": "2020-01-29T09:37:31.1170695Z",
"status": "Pending"
}
],
"items": [
{
"orderItemId": "f4f06c5d-dfe9-4650-8795-9cbcaf1396d5",
"status": "New",
"quantity": 1,
"medicineId": "2918c71f-b7d7-425a-868b-b553e922ed98"
}
]
}

*/
