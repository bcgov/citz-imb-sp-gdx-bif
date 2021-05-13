import { SendEmail, GetUser } from 'components/ApiCalls';
import { IreplacementPair } from '../Interfaces';
import { GetListItems, GetCurrentUser } from '../ApiCalls';

export const sendNotification = async ({
  formValues,
  notificationKey,
  toField,
  ccField = () => [],
  nextClientNumber,
}: any) => {
  const currentUser: any = await GetCurrentUser();
  console.log(`formValues`, formValues);
  const standardReplacementPairs: any = {
    '[SubmitterDisplayName]': currentUser.Title, //!replace with submitter variable
    '[SiteLink]': `<a href='${_spPageContextInfo.webAbsoluteUrl}'>${_spPageContextInfo.webTitle}</a>`,
    '[ExpenseAuthority]': formValues.CASExpAuth,
    '[ClientAccountName]': formValues.ClientTeamName,
    '[ClientAccountNumber]': formValues.ClientNumber,
    '[PrimaryContact]': formValues.PrimaryContact,
    '[Approvers]': formValues.Approver,
    '[FinancialContacts]': formValues.FinContact,
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
    to: [...toField(), currentUser.LoginName], //!needs to be updated
    subject: subject(),
    body: body(),
    cc: ccField(),
  });
};
