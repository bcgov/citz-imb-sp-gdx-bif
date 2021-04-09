import { IColumn } from '@fluentui/react';

export const GetColumns = (viewColumns: [], fields: []): IColumn[] => {
  return viewColumns.map((column: string) => {
    const viewField: {
      InternalName: string;
      Title: string;
      FieldTypeKind: number;
      Required: boolean;
      Description: string;
      AllowMultipleValues: boolean;
    } = fields.filter((field: { InternalName: string }) => {
      return field.InternalName === column;
    })[0];

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
      AllowMultipleValues: viewField.AllowMultipleValues,
    };
    return newColumn;
  });
};
