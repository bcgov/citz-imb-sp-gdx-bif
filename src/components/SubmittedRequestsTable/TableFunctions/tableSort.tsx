export const tableSort = (ev: any, column: any, tableInstance: any) => {
  //change the sort of the column in tableInstance
  column.toggleSortBy(!column.isSortedDesc);

  //get index of the current column
  const currentColumnIndex = tableInstance.columns.findIndex(
    (tColumn: any) => tColumn.key === column.key
  );

  //update fluentUI sort direction indicator
  tableInstance.columns[
    currentColumnIndex
  ].isSortedDescending = !column.isSortedDesc;
};
