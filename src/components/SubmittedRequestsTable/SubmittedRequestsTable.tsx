import {
  CommandBar,
  DetailsList,
  IColumn,
  ICommandBarItemProps,
  Stack,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { GetColumns } from 'components/API/GET/GetColumns';
import { GetSubmittedRequests } from 'components/API/GET/GetSubmittedRequests';
import { AddItemsToList } from 'components/APICalls';
import { FormDialog } from 'components/IntakeForm/FormDialog';
import React, { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Row,
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table';
import { GlobalFilter } from './Filters/GlobalFilter';
import { statusColumnFilter } from './Filters/StatusFilter/statusColumnFilter';
import { StatusFilter } from './Filters/StatusFilter/StatusFilter';
import { ISubmittedRequestItem } from './ISubmittedRequestItem';
import { tableSort } from './tableSort';

//!because React-Table is not properly typed
// import { QuerySuccessResult } from "react-query";
// To intialize
initializeIcons(undefined, { disableWarnings: true });

/*
	Request States:
		new
		submitted
		sent for approval
		accepted
		rejected
		closed
*/

export const SubmittedRequestsTable = () => {
  const listName = 'Submitted Requests';

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  //!because React-Table is not properly typed
  const query: any = useQuery(listName, GetSubmittedRequests);

  const queryClient: any = useQueryClient();

  const addItemMutation = useMutation(
    (newItem: ISubmittedRequestItem) =>
      AddItemsToList({
        listName,
        items: newItem,
      }),
    {
      onMutate: async (newItem: ISubmittedRequestItem) => {
        await queryClient.cancelQueries(listName);

        const previousValues = queryClient.getQueryData(listName);

        //!react-query is not typed
        queryClient.setQueryData(listName, (oldValues) => {
          const newValues = [...oldValues.items];

          newValues.push(newItem);
          return { listInfo: oldValues.listInfo, items: newValues };
        });

        return { previousValues };
      },
      //!react-query is not typed
      onError: (error, newItem: ISubmittedRequestItem, context) =>
        queryClient.setQueryData(listName, context?.previousValues),
      onSettled: async () => await queryClient.invalidateQueries(listName),
    }
  );

  const data = useMemo(() => {
    if (query.isLoading || query.isError) return [];

    return query.data.items;
  }, [query.isLoading, query.isError, query.data?.items]);

  const columns: IColumn & any = useMemo(() => {
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

  const tableInstance: any = useTable(
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

  // When a user clicks a column sort by it
  const handleColumnClick = (ev: any, column: any) => {
    tableSort(ev, column, tableInstance);
  };

  const getNextClientNumber = (): number => {
    //TODO: logic to get next client number (GDXBIF-13)
    return 777;
  };

  if (query.isLoading) return <div>loading...</div>;

  if (query.isError) return <div>{query.error}</div>;

  const onSubmit = (value: any): void => {
    const nextClientNumber = getNextClientNumber();

    const newItem: ISubmittedRequestItem = {
      Title: `${value.Ministry}-${nextClientNumber}`,
      Ministry: value.Ministry,
      Division: value.Division,
      ClientName: value.ClientName,
      ClientNumber: nextClientNumber,
      CASClient: value.CASClient,
      CASResp: value.CASResp,
      CASServ: value.CASServ,
      CASSToB: value.CASSToB,
      CASProj: value.CASProj,
      Status: value.Status,
      ApproverId: {
        results: value.Approver.map((user: any) => user.userId),
      },
      PrimaryContactId: value.PrimaryContact[0].userId,
      FinContactId: {
        results: value.Approver.map((user: any) => user.userId),
      },
      CASExpAuthId: value.CASExpAuth[0].userId,
      OtherContactId: {
        results: value.Approver.map((user: any) => user.userId),
      },
    };

    toggleHideDialog();
    addItemMutation.mutateAsync(newItem);
  };

  const commandItems: ICommandBarItemProps[] = [
    {
      key: 'newItem',
      text: 'New',
      cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
      iconProps: { iconName: 'Add' },
      onClick: toggleHideDialog,
    },
  ];

  return (
    <>
      <Stack
        horizontal
        horizontalAlign={'space-between'}
        verticalAlign={'center'}
      >
        <CommandBar
          items={commandItems}
          ariaLabel='Use left and right arrow keys to navigate between commands'
        />
        <StatusFilter
          data={tableInstance.data}
          columns={tableInstance.columns}
          setFilter={tableInstance.setFilter}
        />
        <GlobalFilter
          preGlobalFilteredRows={tableInstance.preGlobalFilteredRows}
          globalFilter={tableInstance.state.globalFilter}
          setGlobalFilter={tableInstance.setGlobalFilter}
          useAsyncDebounce={useAsyncDebounce}
        />
      </Stack>
      <DetailsList
        items={tableInstance.sortedRows.map((row: Row) => row.values)}
        columns={tableInstance.columns}
        onColumnHeaderClick={handleColumnClick}
        selectionMode={0}
        checkboxVisibility={2}
      />
      <FormDialog
        columns={tableInstance.columns}
        toggleHideDialog={toggleHideDialog}
        hideDialog={hideDialog}
        onSubmit={onSubmit}
      />
    </>
  );
};
