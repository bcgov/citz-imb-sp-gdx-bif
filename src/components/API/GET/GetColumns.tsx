import { IColumn } from '@fluentui/react';
import { Column } from 'react-table';
// import { RenderInputs } from "components/IntakeForm/Inputs/RenderInputs";
export const GetColumns = (viewColumns: [], fields: []): IColumn[] => {
  return viewColumns.map((column: string) => {
    const viewField: {
      InternalName: string;
      Title: string;
      FieldTypeKind: number;
      Required: boolean;
      Description: string;
    } = fields.filter(
      (field: { InternalName: string }) => field.InternalName === column
    )[0];
    let newColumn: IColumn & any = {
      // fieldRender: RenderInputs(viewField.FieldTypeKind),
      fieldTypeKind: viewField.FieldTypeKind,
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
      required: viewField.Required,
      description: viewField.Description,
    };
    return newColumn;
  });
};
