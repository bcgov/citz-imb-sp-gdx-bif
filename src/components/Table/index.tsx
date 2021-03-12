import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { GetSubmittedRequests } from "components/API/GET/GetSubmittedRequests";
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
export const Table = () => {
  const submittedRequests: any = useQuery(
    "submittedRequests",
    GetSubmittedRequests
  );

  const columns = useMemo(() => {
    if (submittedRequests.isLoading || submittedRequests.isError) return [];
    return GetColumns(
      submittedRequests.data.listInfo.DefaultView.ViewFields.Items.results,
      submittedRequests.data.listInfo.Fields.results
    );
  }, [submittedRequests.isLoading, submittedRequests.isError]);

  //   const columns = ministryAcronyms.listInfo.Columns.map((column: string) => {
  //     return { name: column };
  //   });
  console.log("submittedRequests", submittedRequests);

  if (submittedRequests.isLoading) return <div>Loading...</div>;

  return (
    <>
      <DetailsList
        items={submittedRequests.data.items}
        columns={columns}
        disableSelectionZone={true}

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
