
import {useMemo } from 'react';
import { GetSubmittedRequests } from 'components/API/GET/GetSubmittedRequests';
import { useQuery } from 'react-query';
import { IColumn } from '@fluentui/react';

import { ISubmittedRequestItem } from './ISubmittedRequestItem';
import { testData } from './testData';
import React, { useEffect, useMemo, useState } from 'react';
import { GetSubmittedRequests } from 'components/API/GET/GetSubmittedRequests';
import { GetColumns } from 'components/API/GET/GetColumns';
import { AddItemsToList } from 'components/ApiCalls';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { GlobalFilter } from './Filters/GlobalFilter';
import { StatusFilter } from './Filters/StatusFilter/StatusFilter';

import {
	useTable,
	useSortBy,
	useFilters,
	useGlobalFilter,
	useAsyncDebounce,
	Row,
} from 'react-table';
import { DetailsList } from '@fluentui/react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { GetColumns } from 'components/API/GET/GetColumns';
import { tableSort } from './tableSort';
import { statusColumnFilter } from './Filters/StatusFilter/statusColumnFilter';
import { GlobalFilter } from './Filters/GlobalFilter';
import { StatusFilter } from './Filters/StatusFilter/StatusFilter';

//!because React-Table is not properly typed
// import { QuerySuccessResult } from "react-query";
// To intialize
initializeIcons(undefined, { disableWarnings: true });

/*
	Request States:
		new
		submitted
		sent for approval
		accepted
		rejected
		closed
*/

export const SubmittedRequestsTable = () => {

	const queryName: string = 'submittedRequests';

	//@ts-ignore //!because React-Table is not properly typed
	const query: any = useQuery(queryName, GetSubmittedRequests);


	const listName = 'Submitted Requests';
	//!The type for query should be "QuerySuccessResult", but waiting for an update for the dev before we can use it
	const query: any = useQuery(listName, GetSubmittedRequests);
	const queryClient: any = useQueryClient();

	const addItemMutation = useMutation(
		(newItem: ISubmittedRequestItem) =>
			AddItemsToList({
				listName,
				items: newItem,
			}),
		{
			onMutate: async (newItem: ISubmittedRequestItem) => {
				await queryClient.cancelQueries(listName);

				const previousValues = queryClient.getQueryData(listName);

				//@ts-ignore //!react-query is not typed
				queryClient.setQueryData(listName, (oldValues) => {
					let newValues = [...oldValues.items];

					newValues.push(newItem);
					return { listInfo: oldValues.listInfo, items: newValues };
				});

				return { previousValues };
			},
			//@ts-ignore //!react-query is not typed
			onError: (error, newItem: ISubmittedRequestItem, context) =>
				queryClient.setQueryData(listName, context?.previousValues),
			onSettled: async () =>
				await queryClient.invalidateQueries(listName),
		}
	);


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
		statusColumn.filter = statusColumnFilter

		//add the modified 'Status' column back in with the other columns
		const modifiedColumns = [
			...initialColumns.filter((column) => column.key !== 'Status'),
			statusColumn,
		];

		return modifiedColumns;

	}, [query.isLoading, query.isError, query.data]);

console.log('query :>> ', query);
		return GetColumns(
			query.data.listInfo.Columns,
			query.data.listInfo.Fields.results
		);
	}, [query.isLoading, query.isError, query.data?.listInfo]);


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

	if (query.isError) return <div>{query.error}</div>;

	const addNewRequest = () => {
		console.log('add new request');
		addItemMutation.mutateAsync(testData);
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
