import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { GetSubmittedRequests } from "components/API/GET/GetSubmittedRequests";
import { Filter } from "./Filter";
import { Sort } from "./Sort";
import {
  MarqueeSelection,
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn,
  Announced,
  Fabric,
  TextField,
  ITextFieldStyles,
  mergeStyles,
  Text,
} from "@fluentui/react";
import { GetColumns } from "components/API/GET/GetColumns";

// Main Component
export const SubmittedRequestsTable = () => {
  const [filter, setFilter] = useState<string | undefined>();

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

    return tempColumns.map((column) => {
      return { ...column, onColumnClick: Sort };
    });
  }, [submittedRequests.isLoading, submittedRequests.isError]);

  const items = useMemo(() => {
    if (submittedRequests.isLoading || submittedRequests.isError) return [];
    return Filter(submittedRequests.data.items, filter, columns);
  }, [
    submittedRequests.isLoading,
    submittedRequests.isError,
    submittedRequests.isFetching,
    filter,
  ]);

  //   const columns = ministryAcronyms.listInfo.Columns.map((column: string) => {
  //     return { name: column };
  //   });
  console.log("submittedRequests", submittedRequests);
  const onFilter = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    setFilter(text);
  };

  if (submittedRequests.isLoading) return <div>Loading...</div>;

  if (submittedRequests.isError) return <div>{submittedRequests.error}</div>;
  return (
    <>
      <div>{submittedRequests.status}</div>
      <TextField label="Filter by name:" onChange={onFilter} />
      <DetailsList
        items={items}
        columns={columns}
        disableSelectionZone={true}
        selectionMode={0} //0 = none
        // setKey="set"
        // layoutMode={DetailsListLayoutMode.justified}
        // selection={this._selection}
        // selectionPreservedOnEmptyClick={true}
        // ariaLabelForSelectionColumn="Toggle selection"
        // ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        // checkButtonAriaLabel="Row checkbox"
        // onItemInvoked={this._onItemInvoked}
      />
    </>
  );
};
