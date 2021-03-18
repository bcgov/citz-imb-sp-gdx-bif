import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { useQuery } from "react-query";
import { GetSubmittedRequests } from "components/API/GET/GetSubmittedRequests";
import { GetColumns } from "components/API/GET/GetColumns";

export const TableTest = () => {
  const submittedRequests: any = useQuery(
    "submittedRequests",
    GetSubmittedRequests
  );

  const columns = useMemo(() => {
    if (submittedRequests.isLoading || submittedRequests.isError) return [];
    let tempColumns = GetColumns(
      submittedRequests.data.listInfo.DefaultView.ViewFields.Items.results,
      submittedRequests.data.listInfo.Fields.results
    );

    return tempColumns;

    // return tempColumns.map((column) => {
    //     return { ...column, onColumnClick: Sort };
    //   });
  }, [submittedRequests.isLoading, submittedRequests.isError]);

  const data = useMemo(() => {
    if (submittedRequests.isLoading || submittedRequests.isError) return [];
    return submittedRequests.data.items;
  }, [
    submittedRequests.isLoading,
    submittedRequests.isError,
    submittedRequests.isFetching,
  ]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return <div></div>;
};
