import { PeoplePickerSearchProps } from './PeoplePickerSearchProps';
import { RestCall } from '../RestCall/RestCall';
import { IRestCall } from 'components/ApiCalls/Interfaces';

export const EnsureUser = async (accountName: string) => {
  const options: IRestCall = {
    endPoint: `/_api/web/ensureUser`,
    method: 'post',
    body: { logonName: accountName },
  };
  const results = await RestCall(options);
  return [
    {
      account: results.d.LoginName,
      text: results.d.Title,
      userId: results.d.Id,
    },
  ];
};
