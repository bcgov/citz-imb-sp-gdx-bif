import { IColumn } from '@fluentui/react';

import { ISubmittedRequestItem } from './ISubmittedRequestItem';
import { testData } from './testData';
import React, { useEffect, useMemo, useState } from 'react';
import { GetSubmittedRequests } from 'components/API/GET/GetSubmittedRequests';
import { AddItemsToList } from 'components/ApiCalls';
import { useQuery, useQueryClient, useMutation } from 'react-query';

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
import { FormDialog } from 'components/IntakeForm/FormDialog';
import { NavBar } from './NavBar/NavBar';
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
  const listName = 'Submitted Requests';

  //@ts-ignore //!because React-Table is not properly typed
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
      onSettled: async () => await queryClient.invalidateQueries(listName),
    }
  );

  const data = useMemo(() => {
    if (query.isLoading || query.isError) return [];

    return query.data.items;
  }, [query.isLoading, query.isError, query.data?.items]);

  const columns: IColumn & any = useMemo(() => {
    if (query.isLoading || query.isError) return [];

    const initialColumns = GetColumns(
      query.data.listInfo.Columns,
      query.data.listInfo.Fields.results
    );
    //we need to treat 'Status' column differently as we are going to filter on it
    //get the 'Status' column
    let statusColumn: any = initialColumns.filter(
      (column) => column.key === 'Status'
    )[0];

    let authorColumn: any = initialColumns.filter(
      (column) => column.key === 'Author'
    )[0];

    authorColumn.hideOnForm = true;

    //set the custom filter functionality on 'Status' column
    //@ts-ignore //!because React-Table is not properly typed
    statusColumn.filter = statusColumnFilter;
    statusColumn.hideOnForm = true;
    //add the modified 'Status' column back in with the other columns
    const modifiedColumns = [
      ...initialColumns.filter(
        (column) => column.key !== 'Status' && column.key !== 'Author'
      ),
      statusColumn,
      authorColumn,
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

  if (query.isError) return <div>{query.error}</div>;

  const addNewRequest = () => {
    console.log('add new request');
    addItemMutation.mutateAsync(testData);
  };
  return (
    <>
      <NavBar addNewRequest={addNewRequest}>
        <FormDialog columns={tableInstance.columns} />
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
