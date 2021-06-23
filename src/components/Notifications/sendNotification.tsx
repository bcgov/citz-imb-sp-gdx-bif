import { SendEmail, GetUser } from 'components/ApiCalls';
import { ISendNotification } from '../Interfaces';
import { GetListItems, GetCurrentUser } from '../ApiCalls';

export const sendNotification = async ({
  formValues,
  notificationKey,
  toField,
  newSubmissionId,
  clientNumber,
}: ISendNotification) => {
  const currentUser: any = await GetCurrentUser();
  const standardReplacementPairs: any = {
    '[SiteLink]': `<a href='${_spPageContextInfo.webAbsoluteUrl}/SitePages/GDXBIF.aspx?GDXBIFID=${newSubmissionId}'>${_spPageContextInfo.webTitle}</a>`,
    '[SubmitterDisplayName]': currentUser.Title,
    '[ExpenseAuthority]': formValues.CASExpAuth,
    '[ClientAccountName]': formValues.ClientTeamName,
    '[PrimaryContact]': formValues.PrimaryContact,
    '[Approvers]': formValues.Approver,
    '[FinancialContacts]': formValues.FinContact,
    '[ClientAccountNumber]': clientNumber,
  };
  const allNotifications: any = await GetListItems({
    listName: 'NotificationsConfig',
  });
  const body: any = () => {
    let tempBody;
    for (let i = 0; i < allNotifications.length; i++) {
      if (allNotifications[i].key === notificationKey) {
        tempBody = allNotifications[i].body.replace(
          /\[SiteLink\]|\[SubmitterDisplayName\]|\[ExpenseAuthority\]|\[FinancialContacts\]|\[ClientAccountName\]|\[ClientAccountNumber\]|\[PrimaryContact\]|\[Approvers\]/gi,
          (matched: any) => {
            const temp = standardReplacementPairs[matched];
            return temp;
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
  body();
  await SendEmail({
    to: [...toField(), currentUser.LoginName], //!needs to be updated
    subject: subject(),
    body: body(),
  });
};
