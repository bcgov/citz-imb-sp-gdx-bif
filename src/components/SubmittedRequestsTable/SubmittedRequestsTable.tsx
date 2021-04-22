import { CommandBar, DetailsList, Stack } from '@fluentui/react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Row, useAsyncDebounce } from 'react-table';
import { GlobalFilter } from './Filters/GlobalFilter';
import { StatusFilter } from './Filters/StatusFilter/StatusFilter';
import { commandItems } from './NavBar/commandItems/commandItems';
import { tableSort } from './TableFunctions/tableSort';

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

export const SubmittedRequestsTable = ({
  TableInstance,
  handleNewForm,
}: any) => {
  // When a user clicks a column sort by it
  const handleColumnClick = (ev: any, column: any) => {
    tableSort(ev, column, TableInstance);
  };
  return (
    <>
      <Stack
        horizontal
        horizontalAlign={'space-between'}
        verticalAlign={'center'}
      >
        <div style={{ minWidth: '110px' }}>
          <CommandBar
            items={commandItems(handleNewForm)}
            ariaLabel='Use left and right arrow keys to navigate between commands'
          />
        </div>
        <StatusFilter
          data={TableInstance.data}
          columns={TableInstance.columns}
          setFilter={TableInstance.setFilter}
        />
        <GlobalFilter
          preGlobalFilteredRows={TableInstance.preGlobalFilteredRows}
          setGlobalFilter={TableInstance.setGlobalFilter}
          useAsyncDebounce={useAsyncDebounce}
        />
      </Stack>
      <DetailsList
        items={TableInstance.sortedRows.map((row: Row) => row.values)}
        columns={TableInstance.columns}
        onColumnHeaderClick={handleColumnClick}
        selectionMode={0}
        checkboxVisibility={2}
      />
    </>
  );
};
