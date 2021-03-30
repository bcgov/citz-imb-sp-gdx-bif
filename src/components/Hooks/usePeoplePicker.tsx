import { useState, useEffect } from "react";
import { RestCall } from "../ApiCalls/RestCall/RestCall";

export const usePeoplePicker = () => {
  const [searchResults, setSearchResults] = useState([]);

  const reset = () => {
    setSearchResults([]);
  };

  const onChange = async (event: any) => {
    if (event.currentTarget.value.length > 2) {
      const options = {
        endPoint:
          "/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser",
        method: "post",
        body: {
          queryParams: {
            __metadata: {
              type: "SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters",
            },
            AllowEmailAddresses: true,
            AllowMultipleEntities: false,
            AllUrlZones: false,
            MaximumEntitySuggestions: 50,
            PrincipalSource: 1,
            PrincipalType: 1,
            QueryString: event.currentTarget.value,
            // Required: false,
            // SharePointGroupID: null,
            // UrlZone: null,
            // UrlZoneSpecified: false,
            // Web: null,
            // WebApplicationID: null,
          },
        },
        // headers:'',
        // cache:''
      };
      //@ts-ignore
      const results = await RestCall(options);
      setSearchResults(JSON.parse(results.d.ClientPeoplePickerSearchUser));
    }
  };

  return { onChange, searchResults, reset };
};
