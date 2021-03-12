import { IColumn } from "@fluentui/react";

export const Filter = (
  items: [{ key: string }],
  filter: string | undefined,
  columns: Array<IColumn>
) => {
  let tempItems = [...items];

  return filter
    ? tempItems.filter((item: { [key: string]: any }) => {
        const filterCriteria = filter.toLowerCase();
        let keepItem = false;
        for (let i = 0; i < columns.length; i++) {
          if (item[columns[i].key].toLowerCase().indexOf(filterCriteria) > -1) {
            keepItem = true;
            break;
          }
        }
        return keepItem;
      })
    : tempItems;
};
