export type MedicineType = {
	description: string;
	gtin: string;
	snomed: string;
}

export type MedicineResponseType = {
	medicines: MedicineType[];
	request: {
		searchString: string;
	};
	items: number;
	pages: number;
	currentPage: number;
}
