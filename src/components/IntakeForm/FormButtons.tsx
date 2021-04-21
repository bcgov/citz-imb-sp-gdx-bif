import { DefaultButton, PrimaryButton, Stack } from '@fluentui/react';
export const FormButtons = (toggleHideDialog: any, status: string) => {
  if (status === 'New') {
    return (
      <>
        <Stack.Item align='start'>
          <DefaultButton
            onClick={() => {
              toggleHideDialog();
            }}
            text='Cancel'
          />
        </Stack.Item>
        <Stack.Item align='end'>
          <PrimaryButton type='submit' text='Submit' />
        </Stack.Item>
      </>
    );
  } else if (status === 'Submitted') {
    return (
      <>
        <Stack.Item align='start'>
          <DefaultButton
            onClick={() => {
              toggleHideDialog();
            }}
            text='Cancel'
          />
        </Stack.Item>
        <Stack.Item align='end'>
          <DefaultButton type='submit' text='Reject' />

          <PrimaryButton type='submit' text='Approve' />
        </Stack.Item>
      </>
    );
  }
};
