import React, { useEffect, useMemo, useState } from 'react';
import { GetSubmittedRequests } from 'components/API/GET/GetSubmittedRequests';
import { GetColumns } from 'components/API/GET/GetColumns';
import { useQuery } from 'react-query';
import { GlobalFilter } from './Filters/GlobalFilter';
import { StatusFilter } from './Filters/StatusFilter/StatusFilter';
import {
	useTable,
	useSortBy,
	useFilters,
	useGlobalFilter,
	useAsyncDebounce,
	TableInstance,
	TableOptions,
	Row,
} from 'react-table';
import { DetailsList } from '@fluentui/react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { tableSort } from './tableSort';
import { NavBar } from './NavBar/NavBar';
import { IntakeForm } from 'components/IntakeForm/IntakeForm';
//!add back when dev updates library
// import { QuerySuccessResult } from "react-query";
// To intialize
initializeIcons(undefined, { disableWarnings: true });

export const SubmittedRequestsTable = () => {
	//!The type for query should be "QuerySuccessResult", but waiting for an update for the dev before we can use it
	const query: any = useQuery('submittedRequests', GetSubmittedRequests);

	const data = useMemo(() => {
		if (query.isLoading || query.isError) return [];

		return query.data.items;
	}, [query.isLoading, query.isError, query.data]);

	const columns = useMemo(() => {
		if (query.isLoading || query.isError) return [];

		return GetColumns(
			query.data.listInfo.Columns,
			query.data.listInfo.Fields.results
		);
	}, [query.isLoading, query.isError, query.data]);

	const tableInstance: any = useTable(
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

	// When a user clicks a column sort by it
	const handleColumnClick = (ev: any, column: any) => {
		tableSort(ev, column, tableInstance);
	};

	const addNewRequest = () => {
		console.log('add new request');
	};

	return (
		<>
			<NavBar addNewRequest={addNewRequest}>
				<IntakeForm />
				<GlobalFilter
					preGlobalFilteredRows={tableInstance.preGlobalFilteredRows}
					globalFilter={tableInstance.state.globalFilter}
					setGlobalFilter={tableInstance.setGlobalFilter}
					useAsyncDebounce={useAsyncDebounce}
				/>
				<StatusFilter query={query} columns={tableInstance.columns} />
			</NavBar>
			<DetailsList
				items={tableInstance.sortedRows.map((row: Row) => row.values)}
				columns={tableInstance.columns}
				onColumnHeaderClick={handleColumnClick}
				selectionMode={0}
				checkboxVisibility={2}
			/>
		</>
	);
};
