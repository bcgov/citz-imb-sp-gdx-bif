import { useState } from "react";
import { PeoplePickerSearch } from "../ApiCalls/PeoplePickerSearch/PeoplePickerSearch";
export const usePeoplePicker = () => {
  const [searchResults, setSearchResults] = useState([]);

  const reset = () => {
    setSearchResults([]);
  };

  const setFormikValue = (
    pickerItems: Array<Object>,
    fieldProps?: any,
    fieldName?: string
  ) => {
    console.log(`pickerItems`, pickerItems);
    setTimeout(() => {
      fieldProps.form.setFieldValue(fieldName, pickerItems, true);
      fieldProps.form.setFieldTouched(fieldName, true, true);
      reset();
    }, 100); //Time before execution
  };

  const searchPeople = async (filterText?: string) => {
    //@ts-ignore
    if (filterText.length > 2) {
      //@ts-ignore
      const results = await PeoplePickerSearch({ filterText });
      // People picker user properties that are available
      const users = results.map((result: any) => {
        return { text: result.DisplayText, userId: result.EntityData.SPUserID };
      });

      return users;
    }
  };

  return { searchPeople, searchResults, reset, setFormikValue };
};

// Example data resturned:

// Description: "i:0ǵ.t|bcgovidp|bf9add39be63420694fabcca01771a5a"
// DisplayText: "Abraham, Adam PSSG:EX"
// EntityData: {PrincipalType: "User", Title: "Senior Probation Officer", Email: "Adam.Abraham@gov.bc.ca", SPUserID: "1370", AccountName: "i:0ǵ.t|bcgovidp|bf9add39be63420694fabcca01771a5a", …}
// EntityType: ""
// IsResolved: false
// Key: "i:0ǵ.t|bcgovidp|bf9add39be63420694fabcca01771a5a"
// MultipleMatches: []
// ProviderDisplayName: ""
// ProviderName: ""
