import { RestCall } from '../RestCall/RestCall';

export const GetCurrentUser = async (groupIdentifier?: string | number) => {
  const endPoint = '/_api/web/CurrentUser?$expand=groups';

  const response = await RestCall({ endPoint: endPoint });

  for (let i = 0; i < response.d.Groups.results.length; i++) {
    if (
      groupIdentifier === response.d.Groups.results[i].LoginName ||
      groupIdentifier === response.d.Groups.results[i].Id
    )
      response.d.isOwner = true;
  }
  return response.d;
};
