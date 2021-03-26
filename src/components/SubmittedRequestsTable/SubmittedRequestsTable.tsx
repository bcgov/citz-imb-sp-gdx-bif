import React, { useEffect, useMemo, useState } from 'react';
import { GetSubmittedRequests } from 'components/API/GET/GetSubmittedRequests';
import { GetColumns } from 'components/API/GET/GetColumns';
import { useQuery } from 'react-query';
import { GlobalFilter } from './Filters/GlobalFilter';
import { StatusFilter } from './Filters/StatusFilter/StatusFilter';
import { IColumn } from '@fluentui/react';
import { Column } from 'react-table';

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
//!because React-Table is not properly typed
// import { QuerySuccessResult } from "react-query";
// To intialize
initializeIcons(undefined, { disableWarnings: true });

export const SubmittedRequestsTable = () => {
	const queryName: string = 'submittedRequests';

	//@ts-ignore //!because React-Table is not properly typed
	const query: any = useQuery(queryName, GetSubmittedRequests);

	const data = useMemo(() => {
		if (query.isLoading || query.isError) return [];

		return query.data.items;
	}, [query.isLoading, query.isError, query.data]);

	const columns: IColumn & any = useMemo(() => {
		if (query.isLoading || query.isError) return [];

		const initialColumns = GetColumns(
			query.data.listInfo.Columns,
			query.data.listInfo.Fields.results
		);

		//we need to treat 'Status' column differently as we are going to filter on it
		//get the 'Status' column
		let statusColumn = initialColumns.filter(
			(column) => column.key === 'Status'
		)[0];

		//set the custom filter functionality on 'Status' column
		//@ts-ignore //!because React-Table is not properly typed
		statusColumn.filter = (
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
					...rows.filter(
						(row) => row.values.Status === filterValue[i]
					),
				];
			}
			console.log('filteredRows :>> ', filteredRows);
			//return the filtered rows
			return filteredRows;
		};

		//add the modified 'Status' column back in with the other columns
		const modifiedColumns = [
			...initialColumns.filter((column) => column.key !== 'Status'),
			statusColumn,
		];

		return modifiedColumns;
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

	if (query.isLoading) return <div>loading...</div>;

	if (query.isError) return <div>query.error</div>;

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
			<StatusFilter
				data={tableInstance.data}
				columns={tableInstance.columns}
				setFilter={tableInstance.setFilter}
			/>

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
