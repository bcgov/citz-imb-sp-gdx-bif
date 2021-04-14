import { SendEmail, GetUser } from 'components/ApiCalls';
import { useQueryClient } from 'react-query';

interface IemailDetail {
  Title: string;
  Key: string;
  Subject: string;
  Body: string;
  ContactUser: {
    Title: string;
    Email: string;
  };
}

interface IreplacementPair {
  searchValue: string;
  replacementValue: string;
}

export const useNotification = () => {
  const queryClient = useQueryClient();
  const emailDetails: Array<IemailDetail> =
    queryClient.getQueryData('Email Details') ?? [];
  const currentUser = queryClient.getQueryData('CurrentUser') as any;

  const standardReplacementPairs: Array<IreplacementPair> = [
    {
      searchValue: '[SubmitterDisplayName]',
      replacementValue: currentUser.Title,
    },
    {
      searchValue: '[SiteLink]',
      replacementValue: `<a href='${_spPageContextInfo.webAbsoluteUrl}'>${_spPageContextInfo.webTitle}</a>`,
    },
  ];

  const formatText = (
    oldText: string,
    customReplacementPairs: Array<IreplacementPair> = []
  ) => {
    let newText = oldText;
    const replacementPairs = [
      ...standardReplacementPairs,
      ...customReplacementPairs,
    ];

    for (let i = 0; i < replacementPairs.length; i++) {
      newText = newText.replaceAll(
        replacementPairs[i].searchValue,
        replacementPairs[i].replacementValue
      );
    }

    return newText;
  };

  const sendRequestForApprovalEmail = async (ExpenseAuthorityId: number) => {
    const user = await GetUser(ExpenseAuthorityId);

    const EAEmailNotification: IemailDetail = emailDetails.filter(
      (item: IemailDetail) => item.Key === 'EAEmailNotification'
    )[0];

    const customReplacementPairs = [
      {
        searchValue: '[ContactUser]',
        replacementValue: EAEmailNotification.ContactUser.Title,
      },
    ];

    const subject = formatText(
      EAEmailNotification.Subject,
      customReplacementPairs
    );
    const body = formatText(EAEmailNotification.Body, customReplacementPairs);

    await SendEmail({
      to: user.LoginName,
      subject,
      body,
    });
  };

  return { sendRequestForApprovalEmail };
};
