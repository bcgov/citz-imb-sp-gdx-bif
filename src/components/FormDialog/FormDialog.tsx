import { Dialog, DialogType, FontIcon } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import * as React from 'react';
import { Loader } from '../Loader';
import { dialogStyles } from './Styles';
import { CheckMark, XMark } from '../VectorAnimations';
import './formDialog.css';
export const FormDialog = ({
  hideDialog,
  toggleHideDialog,
  content,
  status,
  showLoader,
}: any) => {
  const dialogContentProps = {
    type: DialogType.normal,
    title: showLoader ? (
      'In Progress'
    ) : status === 'New' ? (
      'New'
    ) : status === 'Submitted' ? (
      'Request for Approval'
    ) : status === 'Approved' ? (
      <div style={{ display: 'flex' }}>
        <h3 style={{ marginTop: '15px' }}>Approved</h3>
        <CheckMark />
      </div>
    ) : (
      <div style={{ display: 'flex' }}>
        <h3 style={{ marginTop: '5px' }}>Rejected</h3>
        <XMark />
      </div>
    ),
    closeButtonAriaLabel: 'Close',
    subText: showLoader
      ? ''
      : status === 'New'
      ? 'Create a new submission'
      : status === 'Submitted'
      ? 'Waiting for approval'
      : status === 'Approved'
      ? 'This submission has been Approved'
      : 'This submission has been Rejected',
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
    <>
      <Dialog
        className='formDialog'
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
        maxWidth={3000}
        responsiveMode={0}
        styles={
          !showLoader
            ? dialogStyles(status)
            : {
                main: {
                  background: 'linear-gradient(7deg, black, transparent)',
                },
              }
        }
      >
        {showLoader ? (
          <Loader
            styles={{
              main: {
                color: 'white',
              },
              // progressBar: {
              //   background:
              //     'linear-gradient(to right, rgb(237, 235, 233) 0%, rgb(0 212 23) 50%, rgb(237, 235, 233) 100%)',
              // },
            }}
            label={<p style={{ color: 'white' }}>Submitting Data</p>}
            description={
              <p style={{ color: 'white' }}>
                Please DO NOT close or refresh this tab...
              </p>
            }
          />
        ) : (
          content
        )}
      </Dialog>
    </>
  );
};
