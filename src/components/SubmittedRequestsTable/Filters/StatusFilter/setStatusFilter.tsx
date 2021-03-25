import { IColumn } from "@fluentui/react";
export const setStatusFilter = (
  setAllFilters: Function,
  columns: Array<IColumn>
) => {
  const statusColumn: any = columns.filter((col: any) => {
    return col.key === "Status";
  })[0];

  setAllFilters([{ id: "Title", value: ["test7"] }]);
};
