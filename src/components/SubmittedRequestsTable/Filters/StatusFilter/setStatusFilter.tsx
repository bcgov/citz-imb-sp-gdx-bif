import { IColumn } from "@fluentui/react";
export const setStatusFilter = (
  setFilter: Function,
  columns: Array<IColumn>
) => {
  const statusColumn: any = columns.filter((col: any) => {
    return col.key === "Status";
  })[0];
  setFilter("Status", "New");
  console.log(`columns`, columns);
};
