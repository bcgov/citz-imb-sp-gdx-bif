import React from 'react';
import { IColumn, ActionButton } from '@fluentui/react';

export const EditColumn = (
  toggleHideDialog: any,
  setInitialValues: any,
  item: any,
  column: any,
  index: any
) => {
  return (
    <ActionButton
      onClick={() => {
        item.id = column?.filteredRows[index ?? 0].original.Id;
        item.ApproverName =
          column?.filteredRows[index ?? 0].original.ApproverName;
        item.CASExpAuthName =
          column?.filteredRows[index ?? 0].original.CASExpAuthName;
        item.FinContactName =
          column?.filteredRows[index ?? 0].original.FinContactName;
        item.OtherContactName =
          column?.filteredRows[index ?? 0].original.OtherContactName;
        item.PrimaryContactName =
          column?.filteredRows[index ?? 0].original.PrimaryContactName;
        item.TeamNames = [].concat(
          item.ApproverName.split('; '),
          item.CASExpAuthName.split('; '),
          item.FinContactName.split('; '),
          item.OtherContactName.split('; '),
          item.PrimaryContactName.split('; ')
        );
        console.log(`item`, item);
        console.log(`column`, column);
        setInitialValues(item);
        toggleHideDialog();
      }}
      iconProps={{ iconName: 'EntryView' }}
    />
  );
};
