import { PeoplePickerSearchProps } from './PeoplePickerSearchProps';
import { RestCall } from '../RestCall/RestCall';
import { IRestCall } from 'components/ApiCalls/Interfaces';

export const PeoplePickerSearch = async ({
  filterText,
  __metadata = {
    type: 'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters',
  },
  AllowEmailAddresses = true,
  AllowMultipleEntities = false,
  AllUrlZones = false,
  MaximumEntitySuggestions = 50,
  PrincipalSource = 1,
  PrincipalType = 1,
}: PeoplePickerSearchProps) => {
  const options: IRestCall = {
    endPoint:
      '/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser',
    method: 'post',
    body: {
      queryParams: {
        __metadata,
        AllowEmailAddresses,
        AllowMultipleEntities,
        AllUrlZones,
        MaximumEntitySuggestions,
        PrincipalSource,
        PrincipalType,
        QueryString: filterText,
      },
    },
  };
  const results = await RestCall(options);
  return JSON.parse(results.d.ClientPeoplePickerSearchUser);
};
