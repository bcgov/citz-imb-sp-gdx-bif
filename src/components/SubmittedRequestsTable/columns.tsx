import React, { useMemo } from "react";
import { GetColumns } from "components/API/GET/GetColumns";

export const columns = (query: any) => {
  console.log(`query`, query);
  if (query.isLoading || query.isError) return [];

  const tempColumns = GetColumns(
    query.data.listInfo.Columns,
    query.data.listInfo.Fields.results
  );

  // console.log('tempColumns :>> ', tempColumns);
  return tempColumns;
};
