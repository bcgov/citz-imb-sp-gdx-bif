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

// Main Component
export const SubmittedRequestsTable = () => {
  const [filter, setFilter] = useState<string | undefined>();

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

  const items = useMemo(() => {
    if (submittedRequests.isLoading || submittedRequests.isError) return [];
    console.log("filter", filter);
    let tempItems = [...submittedRequests.data.items];

    return filter
      ? tempItems.filter((item) => {
          const filterCriteria = filter.toLowerCase();
          let keepItem = false;
          for (let i = 0; i < columns.length; i++) {
            if (
              item[columns[i].key].toLowerCase().indexOf(filterCriteria) > -1
            ) {
              keepItem = true;
              break;
            }
          }
          return keepItem;
        })
      : tempItems;
  }, [submittedRequests.isLoading, submittedRequests.isError, filter]);

  //   const columns = ministryAcronyms.listInfo.Columns.map((column: string) => {
  //     return { name: column };
  //   });
  console.log("submittedRequests", submittedRequests);

  if (submittedRequests.isLoading) return <div>Loading...</div>;

  const onFilter = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    setFilter(text);
  };

  return (
    <>
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
