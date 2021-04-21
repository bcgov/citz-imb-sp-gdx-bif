import { SendEmail, GetUser } from 'components/ApiCalls';
import { IreplacementPair } from '../Interfaces';
import { GetListItems } from '../ApiCalls';
export const creationNotification = async (expenseAuthorityId: number) => {
  interface IreplacementPair {
    searchValue: string;
    replacementValue: string;
  }

  const user = await GetUser(expenseAuthorityId);

  const standardReplacementPairs: Array<IreplacementPair> = [
    {
      searchValue: '[SubmitterDisplayName]',
      replacementValue: 'adam.spiteri@gov.bc.ca',
    },
    {
      searchValue: '[SiteLink]',
      replacementValue: `<a href='${_spPageContextInfo.webAbsoluteUrl}'>${_spPageContextInfo.webTitle}</a>`,
    },
  ];

  const subject = 'test subject';

  const allNotifications: any = GetListItems({
    listName: 'NotificationsConfig',
  });

  const body = () => {
    // for (let i = 0; i < allNotifications.length; i++) {
    //   console.log(`allNotifications`, allNotifications);
    //   if (allNotifications[i].key === 'ExpenseAuthority') {
    //     return allNotifications[i].body;
    //   }
    // }
    return 'test';
  };

  console.log(`body`, body());

  // await SendEmail({
  //   to: user.LoginName,
  //   subject,
  //   body,
  // });
};
