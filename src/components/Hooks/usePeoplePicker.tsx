import { useState, useEffect } from "react";
import { PeoplePickerSearch } from "../ApiCalls/PeoplePickerSearch/PeoplePickerSearch";
export const usePeoplePicker = () => {
  const [searchResults, setSearchResults] = useState([]);

  const reset = () => {
    setSearchResults([]);
  };

  const onChange = async (pickerValue: string) => {
    if (pickerValue.length > 2) {
      const results = await PeoplePickerSearch({ pickerValue });

      const test = results.map((result: any) => {
        return { text: result.DisplayText };
      });
      console.log(`test`, test);
      return test;
    }
  };

  return { onChange, searchResults, reset };
};

// Description: "i:0ǵ.t|bcgovidp|bf9add39be63420694fabcca01771a5a"
// DisplayText: "Abraham, Adam PSSG:EX"
// EntityData: {PrincipalType: "User", Title: "Senior Probation Officer", Email: "Adam.Abraham@gov.bc.ca", SPUserID: "1370", AccountName: "i:0ǵ.t|bcgovidp|bf9add39be63420694fabcca01771a5a", …}
// EntityType: ""
// IsResolved: false
// Key: "i:0ǵ.t|bcgovidp|bf9add39be63420694fabcca01771a5a"
// MultipleMatches: []
// ProviderDisplayName: ""
// ProviderName: ""
