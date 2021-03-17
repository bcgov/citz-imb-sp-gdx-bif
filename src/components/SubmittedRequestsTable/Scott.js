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
	}, [query.isFetching]);

	const tableInstance = useTable(
		{ columns, data, disableSortRemove: true },
		// useFilters,
		useGlobalFilter,
		useSortBy
	);

	const handleColumnClick = (ev, column) => {
		console.log('column :>> ', column);

		if (column.isSortedDesc === undefined) {
			column.isSorted = false;
			column.isSortedDescending = true;
		}

		if (column.isSortedDesc === true) {
			column.isSorted = true;
			column.isSortedDescending = true;
		}

		if (column.isSortedDesc === false) {
			column.isSorted = true;
			column.isSortedDescending = false;
		}
		column.toggleSortBy(column.isSortedDescending);
		// column.isSortedDescending = column.isSortedDesc;

		console.log('sorting :>> ', {
			isSortDesc: column.isSortedDesc,
			isSorted: column.isSorted,
			isSortedDescending: column.isSortedDescending,
		});
	};

	// useEffect(() => {
	// 	console.log('QUERY STATUS: ', query.status, query.isFetching);
	// 	return () => {};
	// }, [query.status, query.isFetching]);

	// useEffect(() => {
	// 	console.log('TABLE STATUS: ', tableInstance.state);
	// 	return () => {};
	// }, [tableInstance.state]);

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
