import { SendEmail, GetUser } from 'components/ApiCalls';
import { IreplacementPair } from '../Interfaces';
import { GetListItems, GetCurrentUser } from '../ApiCalls';

export const creationNotification = async (expenseAuthorityId: number) => {
  interface IreplacementPair {
    searchValue: string;
    replacementValue: string;
  }

  const sendTo = await GetUser(expenseAuthorityId);

  const currentUser: any = await GetCurrentUser();

  const standardReplacementPairs: any = {
    '[SubmitterDisplayName]': currentUser.Title, //!replace with submitter variable
    '[SiteLink]': `<a href='${_spPageContextInfo.webAbsoluteUrl}'>${_spPageContextInfo.webTitle}</a>`,
  };

  const allNotifications: any = await GetListItems({
    listName: 'NotificationsConfig',
  });

  const body: any = () => {
    let tempBody;
    for (let i = 0; i < allNotifications.length; i++) {
      if (allNotifications[i].key === 'ExpenseAuthority') {
        tempBody = allNotifications[i].body.replace(
          /\[SubmitterDisplayName\]|\[SiteLink\]/gi,
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
      if (allNotifications[i].key === 'ExpenseAuthority') {
        return allNotifications[i].subject;
      }
    }
  };

  await SendEmail({
    to: sendTo.LoginName,
    subject: subject(),
    body: body(),
    cc: [currentUser.LoginName],
  });
};
