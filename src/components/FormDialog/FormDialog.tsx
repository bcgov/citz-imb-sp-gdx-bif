import { Dialog, DialogType } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import * as React from 'react';
const dialogContentProps = {
  type: DialogType.normal,
  title: 'New Intake',
  closeButtonAriaLabel: 'Close',
  subText: 'Create new request',
};

export const FormDialog = ({ hideDialog, toggleHideDialog, content }: any) => {
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
