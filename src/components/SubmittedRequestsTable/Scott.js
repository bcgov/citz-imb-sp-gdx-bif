import React, { useEffect, useMemo, useState } from 'react';
import { GetSubmittedRequests } from 'components/API/GET/GetSubmittedRequests';
import { GetColumns } from 'components/API/GET/GetColumns';
import { useQuery } from 'react-query';
import {GlobalFilter} from './GlobalFilter'
import {StatusFilter} from "./StatusFilter"
import {
	useTable,
	useSortBy,
	useFilters,
	useGlobalFilter,
	useAsyncDebounce,
} from 'react-table';
import { DetailsList, DefaultButton } from '@fluentui/react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
initializeIcons(undefined, { disableWarnings: true });



const StateFilter = ({ requestStates, onClick }) => {
	// console.log('requestStates :>> ', requestStates);
	const handleClick = (event) => {
		onClick(event.target.innerText);
	};
	return requestStates.map((state) => {
		return (
			<DefaultButton
				key={state.status}
				toggle
				checked={state.checked}
				text={state.status}
				// iconProps={muted ? volume0Icon : volume3Icon}
				onClick={handleClick}
				// allowDisabledFocus
				// disabled={disabled}
				// id={state}
			/>
		);
	});
};

export const Scott = () => {
	const [requestStates, setRequestStates] = useState([]);

	const query = useQuery('scott', GetSubmittedRequests);

	const data = useMemo(() => {
		if (query.isLoading || query.isError) return [];

		// console.log('query.data.items :>> ', query.data.items);

		const status = [
			...new Set(query.data.items.map((item) => item.Status)),
		];

		// console.log('status :>> ', status);

		setRequestStates(
			status.map((state) => {
				return { status: state, checked: true };
			})
		);

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
		useFilters,
		useGlobalFilter,
		useSortBy
	);
	// console.log('tableInstance :>> ', tableInstance);
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

	const handleFilterClick = (newStatus) => {
		// console.log('you clicked', newStatus);

		let newRequestStates = requestStates.map((thisStatus) => {
			if (thisStatus.status === newStatus)
				return { status: newStatus, checked: !thisStatus.checked };
			return thisStatus;
		});

		// console.log('newRequestStates :>> ', newRequestStates);

		setRequestStates(newRequestStates);

		const statusColumn = tableInstance.columns.filter(
			(col) => col.key === 'Status'
		)[0];

		statusColumn.setFilter(newStatus);
	};

	return (
		<>
			<div>{query.status}</div>
			<br />
			<GlobalFilter
				preGlobalFilteredRows={tableInstance.preGlobalFilteredRows}
				globalFilter={tableInstance.state.globalFilter}
				setGlobalFilter={tableInstance.setGlobalFilter}
				useAsyncDebounce={useAsyncDebounce}
			/>
			<StateFilter
				requestStates={requestStates}
				onClick={handleFilterClick}
			/>
			<DetailsList
				items={tableInstance.sortedRows.map((row) => row.values)}
				columns={tableInstance.columns}
				onColumnHeaderClick={handleColumnClick}
				selectionMode={false}
				checkboxVisibility={2}
			/>
			<StatusFilter query={query}/>
		</>
	);
};
