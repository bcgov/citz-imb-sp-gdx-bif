import { Row } from 'react-table';

export const statusColumnFilter = (
	rows: Array<Row>,
	columnIds: Array<string>,
	filterValue: Array<string> | string
) => {
	//'filterValue' can be a string or an array, our code needs it to be an array
	if (!Array.isArray(filterValue)) filterValue = [filterValue];

	//start with no rows
	let filteredRows: Row[] = [];

	//for each filter value
	for (let i = 0; i < filterValue.length; i++) {
		//add in rows that match the filter value
		filteredRows = [
			...filteredRows,
			//@ts-ignore //!because React-Table is not properly typed
			...rows.filter((row) => row.values.Status === filterValue[i]),
		];
	}
	//return the filtered rows
	return filteredRows;
};
