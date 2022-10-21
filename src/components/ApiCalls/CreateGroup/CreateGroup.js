import { RestCall } from '../RestCall/RestCall';

export const CreateGroup = async ({
  groupName,
  groupDescription = '',
  allowMembersEditMembership = false,
}) => {
  let endPoint = `/_api/web/SiteGroups`;

  const body = {
    __metadata: { type: 'SP.Group' },
    Description: groupDescription,
    Title: groupName,
    AllowMembersEditMembership: allowMembersEditMembership,
  };

  const response = await RestCall({
    endPoint,
    method: 'post',
    body,
  });

  return response.d;
};
