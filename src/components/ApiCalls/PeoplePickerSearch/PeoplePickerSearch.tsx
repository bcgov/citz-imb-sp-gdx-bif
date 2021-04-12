import { PeoplePickerSearchProps } from './PeoplePickerSearchProps';
import { RestCall } from 'components/APICalls/RestCall/RestCall';

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
  const options = {
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
