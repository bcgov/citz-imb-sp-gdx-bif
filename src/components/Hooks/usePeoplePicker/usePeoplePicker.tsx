import { useState } from 'react';
import { PeoplePickerSearch } from 'components/ApiCalls';
export const usePeoplePicker = () => {
  const [searchResults, setSearchResults] = useState([]);

  const reset = () => {
    setSearchResults([]);
  };

  const setFormikValue = (
    pickerItems: Array<any>,
    fieldProps?: any,
    fieldName?: string
  ) => {
    setTimeout(() => {
      fieldProps.form.setFieldValue(fieldName, pickerItems, true);
      fieldProps.form.setFieldTouched(fieldName, true, true);
      console.log('setFormikValue');

      reset();
    }, 100); //Time before execution
  };

  const searchPeople = async (filterText?: string) => {
    if (filterText && filterText.length > 2) {
      const results = await PeoplePickerSearch({ filterText });
      console.log(`results`, results);
      // People picker user properties that are available
      const users = results.map((result: any) => {
        return {
          text: result.DisplayText,
          userId: result.EntityData.SPUserID,
          account: result.Key,
        };
      });

      return users;
    }
  };

  return { searchPeople, searchResults, reset, setFormikValue };
};

// Example data returned:

// Description: "i:0ǵ.t|bcgovidp|bf9add39be63420694fabcca01771a5a"
// DisplayText: "Abraham, Adam PSSG:EX"
// EntityData: {PrincipalType: "User", Title: "Senior Probation Officer", Email: "Adam.Abraham@gov.bc.ca", SPUserID: "1370", AccountName: "i:0ǵ.t|bcgovidp|bf9add39be63420694fabcca01771a5a", …}
// EntityType: ""
// IsResolved: false
// Key: "i:0ǵ.t|bcgovidp|bf9add39be63420694fabcca01771a5a"
// MultipleMatches: []
// ProviderDisplayName: ""
// ProviderName: ""
