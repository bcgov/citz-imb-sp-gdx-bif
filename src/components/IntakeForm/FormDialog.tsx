import * as React from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  hiddenContentStyle,
  mergeStyles,
  Toggle,
  ContextualMenu,
  IColumn,
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
const screenReaderOnly = mergeStyles(hiddenContentStyle);
const dialogContentProps = {
  type: DialogType.normal,
  title: 'New Intake',
  closeButtonAriaLabel: 'Close',
  subText: 'Create new request',
};

export const FormDialog = ({ columns }: any) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
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
      <label id={labelId} className={screenReaderOnly}>
        My sample label
      </label>
      <label id={subTextId} className={screenReaderOnly}>
        My sample description
      </label>
      {/* {
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "stretch",
        } */}
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
