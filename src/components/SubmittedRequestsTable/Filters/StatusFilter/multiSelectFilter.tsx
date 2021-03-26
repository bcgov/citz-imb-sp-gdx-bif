/* Custom filter function */
export const multiSelectFilter = (
  rows: any,
  columnIds: any,
  filterValue: any
) => {
  console.log(`rows,columnIds,filterValue`, rows, columnIds, filterValue);
  // Filters only if filters are selected
  return filterValue.length === 0
    ? rows
    : rows.filter((row: any) =>
        filterValue.includes(String(row.original.status))
      );
};
