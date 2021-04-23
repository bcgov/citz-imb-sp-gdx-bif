import { SendEmail, GetUser } from 'components/ApiCalls';
import { IreplacementPair } from '../Interfaces';
import { GetListItems, GetCurrentUser } from '../ApiCalls';

export const sendNotification = async (formValues: any) => {
  interface IreplacementPair {
    searchValue: string;
    replacementValue: string;
  }

  const currentUser: any = await GetCurrentUser();

  const standardReplacementPairs: any = {
    '[SubmitterDisplayName]': currentUser.Title, //!replace with submitter variable
    '[SiteLink]': `<a href='${_spPageContextInfo.webAbsoluteUrl}'>${_spPageContextInfo.webTitle}</a>`,
    '[ExpenseAuthority]': formValues.CASExpAuth,
    '[ClientAccountName]': formValues.ClientName,
    '[ClientAccountNumber]': '99999',
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
      if (allNotifications[i].key === 'GDXApproved') {
        tempBody = allNotifications[i].body.replace(
          /\[SubmitterDisplayName\]|\[ExpenseAuthority\]|\[FinancialContacts\]\[ClientAccountName\]|\[ClientAccountNumber\]|\[PrimaryContact\]|\[Approvers\]|\[SiteLink\]/gi,
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
      if (allNotifications[i].key === 'GDXApproved') {
        return allNotifications[i].subject;
      }
    }
  };

  console.log(`body`, body);

  await SendEmail({
    to: 'i:0ǵ.t|bcgovidp|fc9f8c4adca2445f80e247555906c873',
    subject: subject(),
    body: body(),
    cc: [currentUser.LoginName],
  });
};
