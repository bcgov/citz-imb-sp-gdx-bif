import { SendEmail, GetUser } from 'components/ApiCalls';
import { IreplacementPair } from '../Interfaces';
import { GetListItems, GetCurrentUser } from '../ApiCalls';

export const sendNotification = async (
  formValues: any,
  notificationKey: string,
  nextClientNumber?: number
) => {
  const currentUser: any = await GetCurrentUser();

  const standardReplacementPairs: any = {
    '[SubmitterDisplayName]': currentUser.Title, //!replace with submitter variable
    '[SiteLink]': `<a href='${_spPageContextInfo.webAbsoluteUrl}'>${_spPageContextInfo.webTitle}</a>`,
    '[ExpenseAuthority]': <b>{formValues.CASExpAuth}</b>,
    '[ClientAccountName]': <b>{formValues.ClientName}</b>,
    '[ClientAccountNumber]': nextClientNumber,
    '[PrimaryContact]': <b>{formValues.PrimaryContact}</b>,
    '[Approvers]': <b>{formValues.Approver}</b>,
    '[FinancialContacts]': <b>{formValues.FinContact}</b>,
  };

  const allNotifications: any = await GetListItems({
    listName: 'NotificationsConfig',
  });

  const body: any = () => {
    let tempBody;
    for (let i = 0; i < allNotifications.length; i++) {
      if (allNotifications[i].key === notificationKey) {
        tempBody = allNotifications[i].body.replace(
          /\[SubmitterDisplayName\]|\[ExpenseAuthority\]|\[FinancialContacts\]|\[ClientAccountName\]|\[ClientAccountNumber\]|\[PrimaryContact\]|\[Approvers\]|\[SiteLink\]/gi,
          function (matched: any) {
            return standardReplacementPairs[matched];
          }
        );
      }
    }
    return tempBody;
  };

  const subject = () => {
    for (let i = 0; i < allNotifications.length; i++) {
      if (allNotifications[i].key === notificationKey) {
        return allNotifications[i].subject;
      }
    }
  };

  await SendEmail({
    to: [
      'i:0ǵ.t|bcgovidp|fc2ed940df8a443db9eab7c8769b9840',
      'i:0ǵ.t|bcgovidp|1e9f2b4e96094ae2a9cba4387a9f668d',
    ], //!needs to be updated
    subject: subject(),
    body: body(),
    cc: [currentUser.LoginName],
  });
};
