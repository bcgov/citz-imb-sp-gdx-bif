import { useTable, useFilters, useGlobalFilter, useSortBy } from 'react-table';

export const TableInstance: any = (columns: any, data: any) => {
  return useTable(
    {
      columns,
      data,
      disableSortRemove: true,
      autoResetSortBy: false,
      autoResetGlobalFilter: false,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );
};
