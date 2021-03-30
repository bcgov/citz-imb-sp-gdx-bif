import { IColumn } from "@fluentui/react";
import { Column } from "react-table";

export const GetColumns = (viewColumns: [], fields: []): IColumn[] => {
  return viewColumns.map((column: string) => {
    const viewField: {
      InternalName: string;
      Title: string;
    } = fields.filter(
      (field: { InternalName: string }) => field.InternalName === column
    )[0];

    let newColumn: IColumn & any = {
      key: viewField.InternalName,
      name: viewField.Title,
      fieldName: viewField.InternalName,
      minWidth: 100,
      maxWidth: 100,
      accessor: viewField.InternalName,
      canSort: true,
      isSorted: false,
      isSortedDesc: true,
      isSortedDescending: true,
      canFilter: true,
    };

    return newColumn;
  });
};
