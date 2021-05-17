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
      styles={{
        root: {
          margin: '-13px 0px 0 23px',
          height: '39px',
          padding: '0px 4px',
        },
      }}
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
        item.ApproverId = column?.filteredRows[index ?? 0].original.ApproverId;
        item.CASExpAuthId =
          column?.filteredRows[index ?? 0].original.CASExpAuthId;
        item.FinContactId =
          column?.filteredRows[index ?? 0].original.FinContactId;
        item.OtherContactId =
          column?.filteredRows[index ?? 0].original.OtherContactId;
        item.PrimaryContactId =
          column?.filteredRows[index ?? 0].original.PrimaryContactId;
        item.TeamNames = [].concat(
          item.ApproverName.split('; '),
          item.CASExpAuthName.split('; '),
          item.FinContactName.split('; '),
          item.OtherContactName.split('; '),
          item.PrimaryContactName.split('; ')
        );
        setInitialValues(item);
        toggleHideDialog();
      }}
      iconProps={{ iconName: 'EntryView' }}
    />
  );
};
