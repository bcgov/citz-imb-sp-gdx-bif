import { RestCall } from '../RestCall/RestCall';
import { IAddUsersToGroup } from '../../Interfaces';
import { formatDiagnostic } from 'typescript';
export const AddUsersToGroup = async ({
  groupId,
  groupName,
  loginNames,
}: IAddUsersToGroup) => {
  let endPoint: string;

  if (!Array.isArray(loginNames)) loginNames = [loginNames];

  if (groupId) {
    endPoint = `/_api/web/SiteGroups(${groupId})/Users`;
  } else {
    endPoint = `/_api/web/SiteGroups/getByName('${groupName}')/Users`;
  }

  const responses: any = [];

  for (let i = 0; i < loginNames.length; i++) {
    const response = await RestCall({
      endPoint: endPoint,
      method: 'post',
      body: {
        __metadata: {
          type: 'SP.User',
        },
        LoginName: loginNames[i],
      },
    });
    console.log(`response`, i, response);
    responses.push(response);
  }
  return responses;
};
