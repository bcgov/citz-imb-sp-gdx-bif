import { ISubmittedRequestItem } from "./ISubmittedRequestItem";
import { testData } from "./testData";
import React, { useEffect, useMemo, useState } from "react";
import { GetSubmittedRequests } from "components/API/GET/GetSubmittedRequests";
import { GetColumns } from "components/API/GET/GetColumns";
import { AddItemsToList } from "components/ApiCalls";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { GlobalFilter } from "./Filters/GlobalFilter";
import { StatusFilter } from "./Filters/StatusFilter/StatusFilter";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  TableInstance,
  TableOptions,
  Row,
} from "react-table";
import { DetailsList, initializeIcons } from "@fluentui/react";
import { tableSort } from "./tableSort";
import { NavBar } from "./NavBar/NavBar";
import { IntakeForm } from "components/IntakeForm/IntakeForm";
//!add back when dev updates library
// import { QuerySuccessResult } from "react-query";
// To intialize
initializeIcons(undefined, { disableWarnings: true });

export const SubmittedRequestsTable = () => {
  const listName = "Submitted Requests";
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
      onSettled: async () => await queryClient.invalidateQueries(listName),
    }
  );

  const data = useMemo(() => {
    if (query.isLoading || query.isError) return [];

    return query.data.items;
  }, [query.isLoading, query.isError, query.data]);

  const columns = useMemo(() => {
    if (query.isLoading || query.isError) return [];
    console.log("query :>> ", query);
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

  const addNewRequest = () => {
    console.log("add new request");
    addItemMutation.mutateAsync(testData);
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
