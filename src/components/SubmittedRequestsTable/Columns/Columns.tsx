import { useMemo } from 'react';
import { GetColumns } from 'components/API/GET/GetColumns';
// import { IColumn } from '@fluentui/react';
import { statusColumnFilter } from '../Filters';

export const Columns = (query: any) => {
  return useMemo(() => {
    if (query.isLoading || query.isError) return [];

    const initialColumns = GetColumns(
      query.data.listInfo.Columns,
      query.data.listInfo.Fields.results
    );
    //we need to treat 'Status' column differently as we are going to filter on it
    //get the 'Status' column
    const statusColumn: any = initialColumns.filter(
      (column) => column.key === 'Status'
    )[0];

    const authorColumn: any = initialColumns.filter(
      (column) => column.key === 'Author'
    )[0];

    authorColumn.hideOnForm = true;

    //set the custom filter functionality on 'Status' column
    //!because React-Table is not properly typed
    statusColumn.filter = statusColumnFilter;
    statusColumn.hideOnForm = true;
    //add the modified 'Status' column back in with the other columns
    const modifiedColumns = [
      ...initialColumns.filter(
        (column) => column.key !== 'Status' && column.key !== 'Author'
      ),
      statusColumn,
      authorColumn,
    ];
    return modifiedColumns;
  }, [query.isLoading, query.isError, query.data]);
};
