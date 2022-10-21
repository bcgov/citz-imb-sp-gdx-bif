import { DefaultButton, PrimaryButton, Stack } from '@fluentui/react';
import { GetCurrentUser } from 'components/ApiCalls';

export const FormButtons = (
  toggleHideDialog: any,
  status: string,
  form: any,
  currentUser: any,
  CASExpAuthName: string
) => {
  if (status === 'New') {
    return (
      <>
        <Stack.Item align='start'>
          <DefaultButton
            onClick={() => {
              toggleHideDialog();
            }}
            text='Close'
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
            text='Close'
          />
        </Stack.Item>
        {currentUser.isOwner || CASExpAuthName === currentUser.LoginName ? (
          <>
            <Stack.Item align='end'>
              <DefaultButton
                type='submit'
                onClick={() => {
                  form.setFieldValue('Status', 'Rejected');
                }}
                text='Reject'
              />
            </Stack.Item>
            <Stack.Item align='end'>
              <PrimaryButton
                type='submit'
                onClick={() => {
                  form.setFieldValue('Status', 'Approved');
                }}
                text='Approve'
              />
            </Stack.Item>
          </>
        ) : (
          ''
        )}
      </>
    );
  } else if (status === 'Approved' || status === 'Rejected') {
    return (
      <>
        <Stack.Item align='start'>
          <DefaultButton
            onClick={() => {
              toggleHideDialog();
            }}
            text='Close'
          />
        </Stack.Item>
      </>
    );
  }
};
