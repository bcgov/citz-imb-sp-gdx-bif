import * as React from 'react';
import {
  Dialog,
  DialogType,
  DefaultButton,
  ContextualMenu,
} from '@fluentui/react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { IntakeForm } from './IntakeForm';
const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
};
const dialogContentProps = {
  type: DialogType.normal,
  title: 'New Intake',
  closeButtonAriaLabel: 'Close',
  subText: 'Create new request',
};

export const FormDialog = ({ columns }: any) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable] = useBoolean(false);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable, labelId, subTextId]
  );

  return (
    <>
      <DefaultButton
        secondaryText='Opens the Sample Dialog'
        onClick={toggleHideDialog}
        text='New +'
      />
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
        maxWidth={3000}
      >
        <IntakeForm columns={columns} toggleHideDialog={toggleHideDialog} />
      </Dialog>
    </>
  );
};
