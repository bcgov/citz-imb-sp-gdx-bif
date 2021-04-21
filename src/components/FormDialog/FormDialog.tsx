import { Dialog, DialogType } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import * as React from 'react';

export const FormDialog = ({
  hideDialog,
  toggleHideDialog,
  content,
  status,
}: any) => {
  const dialogContentProps = {
    type: DialogType.normal,
    title: status === 'New' ? 'New' : 'Approval',
    closeButtonAriaLabel: 'Close',
    subText:
      status === 'New' ? 'Create a new entry' : 'Approve or Decline submision',
  };

  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      // styles: dialogStyles,
    }),
    [labelId, subTextId]
  );

  return (
    <Dialog
      hidden={hideDialog}
      onDismiss={toggleHideDialog}
      dialogContentProps={dialogContentProps}
      modalProps={modalProps}
      maxWidth={3000}
    >
      {content}
    </Dialog>
  );
};
