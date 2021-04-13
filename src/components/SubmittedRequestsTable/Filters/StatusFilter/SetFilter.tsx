import { IColumn } from '@fluentui/react';
export const SetFilter = (newStatus: string, columns: Array<IColumn>) => {
  const statusColumn: any = columns.filter(
    (col: any) => col.key === 'Status'
  )[0];

  statusColumn.setFilter(newStatus);
};
