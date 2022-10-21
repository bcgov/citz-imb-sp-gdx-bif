import { useMemo } from 'react';
import { GetColumns } from '../../API/GET/GetColumns';
import { IColumn, ActionButton } from '@fluentui/react';
import { statusColumnFilter } from '../Filters';
import { EditColumn } from './EditColumn';
export const Columns = (
  query: any,
  toggleHideDialog?: any,
  setInitialValues?: any
) => {
  return useMemo(() => {
    if (query.isLoading || query.isError) return [];

    const initialColumns: any = GetColumns(
      query.data.listInfo.Columns,
      query.data.listInfo.Fields.results
    );

    for (let i = 0; i < initialColumns.length; i++) {
      switch (initialColumns[i].key) {
        case 'Status':
          initialColumns[i].hideOnForm = true;
          initialColumns[i].filter = statusColumnFilter;

          break;
        case 'Author':
          initialColumns[i].hideOnForm = true;

          break;
        case 'Title':
          initialColumns[i].hideOnForm = true;

          break;
        case 'ClientNumber':
          initialColumns[i].hideOnForm = true;

          break;

        default:
      }
    }

    initialColumns.unshift({
      accessor: 'editColumn',
      id: 'editColumn',
      onRender: (item?: any, index?: number, column?: IColumn | any) => {
        return EditColumn(
          toggleHideDialog,
          setInitialValues,
          item,
          column,
          index
        );
      },
      key: 'Open Item',
      name: 'Open Item',
      minWidth: 100,
      maxWidth: 100,
      canSort: false,
      isSorted: false,
      isSortedDesc: false,
      isSortedDescending: false,
      canFilter: false,
      hideOnForm: true,
    });

    return initialColumns;
  }, [query.isLoading, query.isError, query.data]);
};
