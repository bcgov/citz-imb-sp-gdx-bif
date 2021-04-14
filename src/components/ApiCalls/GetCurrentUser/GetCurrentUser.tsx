import { RestCall } from '../RestCall/RestCall';

export const GetCurrentUser = async () => {
  const endPoint = '/_api/web/CurrentUser';

  const response = await RestCall({ endPoint: endPoint });

  return response.d;
};
