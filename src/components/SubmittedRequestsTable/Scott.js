import React, { useEffect, useMemo, useState } from 'react';
import { GetSubmittedRequests } from 'components/API/GET/GetSubmittedRequests';
import { GetColumns } from 'components/API/GET/GetColumns';
import { useQuery } from 'react-query';
import {
	useTable,
	useSortBy,
	useFilters,
	useGlobalFilter,
	useAsyncDebounce,
} from 'react-table';
import { DetailsList } from '@fluentui/react';
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons(undefined, { disableWarnings: true });

// Define a default UI for filtering
function GlobalFilter({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
}) {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = React.useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<span>
			Search:{' '}
			<input
				value={value || ''}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				placeholder={`${count} records...`}
				style={{
					fontSize: '1.1rem',
					border: '0',
				}}
			/>
		</span>
	);
}

export const Scott = () => {
	const [currentColumn, setCurrentColumn] = useState();
	const query = useQuery('scott', GetSubmittedRequests);

	const data = useMemo(() => {
		if (query.isLoading || query.isError) return [];
		return query.data.items;
	}, [query.isLoading, query.isError, query.data]);

	const columns = useMemo(() => {
		if (query.isLoading || query.isError) return [];

		const tempColumns = GetColumns(
			query.data.listInfo.Columns,
			query.data.listInfo.Fields.results
		);

		// console.log('tempColumns :>> ', tempColumns);
		return tempColumns;
	}, [query.isLoading, query.isError, query.data]);

	const tableInstance = useTable(
		{
			columns,
			data,
			disableSortRemove: true,
			autoResetSortBy: false,
			autoResetGlobalFilter: false,
		},
		// useFilters,
		useGlobalFilter,
		useSortBy
	);

	const handleColumnClick = (ev, column) => {
		//change the sort of the column in tableInstance
		column.toggleSortBy(!column.isSortedDesc);

		//get index of the current column
		const currentColumnIndex = tableInstance.columns.findIndex(
			(tColumn) => tColumn.key === column.key
		);

		//update fluentUI sort direction indicator
		tableInstance.columns[
			currentColumnIndex
		].isSortedDescending = !column.isSortedDesc;
	};

	return (
		<>
			<div>{query.status}</div>
			<br />
			<GlobalFilter
				preGlobalFilteredRows={tableInstance.preGlobalFilteredRows}
				globalFilter={tableInstance.state.globalFilter}
				setGlobalFilter={tableInstance.setGlobalFilter}
			/>
			<DetailsList
				items={tableInstance.sortedRows.map((row) => row.values)}
				columns={tableInstance.columns}
				onColumnHeaderClick={handleColumnClick}
			/>
		</>
	);
};
