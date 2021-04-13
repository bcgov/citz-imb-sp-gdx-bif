import { useConfig } from 'components/Hooks';
import { SendEmail, GetUser } from 'components/ApiCalls';

export const useNotification = () => {
  const config = useConfig();

  const sendRequestForApprovalEmail = async (): Promise<void> => {
    console.log('sendRequestForApprovalEmail');

    const user = await GetUser(10);
    console.log('user :>> ', user);
    const notification = config.filter(
      (item: any) => item.Key === 'EAEmailNotification'
    )[0];

    await SendEmail({
      to: user.LoginName,
      subject: 'Hello',
      body: 'There',
      // cc: ['stoews@idir'],
      // bcc: ['Scott.Toews@gov.bc.ca'],
    });

    console.log('notification :>> ', notification);

    return;
  };

  return { sendRequestForApprovalEmail };
};
