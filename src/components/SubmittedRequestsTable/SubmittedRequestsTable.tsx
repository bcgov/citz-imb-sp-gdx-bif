import React, { useEffect, useMemo, useState } from "react";
import { GetSubmittedRequests } from "components/API/GET/GetSubmittedRequests";
import { GetColumns } from "components/API/GET/GetColumns";
import { useQuery } from "react-query";
import { GlobalFilter } from "./Filters/GlobalFilter";
import { StatusFilter } from "./Filters/StatusFilter/StatusFilter";
import { IColumn } from "@fluentui/react";
import { Column } from "react-table";

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
import { DetailsList } from "@fluentui/react";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { tableSort } from "./tableSort";
//!add back when dev updates library
// import { QuerySuccessResult } from "react-query";
// To intialize
initializeIcons(undefined, { disableWarnings: true });

export const SubmittedRequestsTable = () => {
  //!The type for query should be "QuerySuccessResult", but waiting for an update for the dev before we can use it
  const query: any = useQuery("submittedRequests", GetSubmittedRequests);

  const data = useMemo(() => {
    if (query.isLoading || query.isError) return [];

    return query.data.items;
  }, [query.isLoading, query.isError, query.data]);

  const columns: IColumn & any = useMemo(() => {
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
        query={query}
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
