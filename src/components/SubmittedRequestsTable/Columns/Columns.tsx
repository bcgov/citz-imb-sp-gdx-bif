import { useMemo } from 'react';
import { GetColumns } from '../../API/GET/GetColumns';
import { IColumn, ActionButton } from '@fluentui/react';
import { statusColumnFilter } from '../Filters';

export const Columns = (
  query: any,
  toggleHideDialog?: any,
  setInitialValues?: any
) => {
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

    modifiedColumns.push({
      accessor: 'editColumn',
      id: 'editColumn',
      onRender: (item?: any, index?: number, column?: IColumn | any) => {
        return (
          <ActionButton
            onClick={() => {
              item.id = column?.filteredRows[index ?? 0].original.Id;
              item.CASExpAuthId =
                column?.filteredRows[index ?? 0].original.CASExpAuthId;

              setInitialValues(item);
              toggleHideDialog();
            }}
            iconProps={{ iconName: 'EntryView' }}
          />
        );
      },
      key: 'editColumn',
      name: 'editColumn',
      minWidth: 100,
      maxWidth: 100,
      canSort: false,
      isSorted: false,
      isSortedDesc: false,
      isSortedDescending: false,
      canFilter: false,
      hideOnForm: true,
    });
    return modifiedColumns;
  }, [query.isLoading, query.isError, query.data]);
};
