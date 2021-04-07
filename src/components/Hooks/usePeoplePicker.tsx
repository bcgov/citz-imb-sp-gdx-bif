import { useState, useEffect } from "react";
import { PeoplePickerSearch } from "../ApiCalls/PeoplePickerSearch/PeoplePickerSearch";
import { IPersonaProps } from "@fluentui/react";
export const usePeoplePicker = () => {
  const [searchResults, setSearchResults] = useState([]);

  const reset = () => {
    setSearchResults([]);
  };

  const onChange = async (
    pickerValue: string,
    currentPersonas: IPersonaProps[],
    limitResults: number,
    fieldProps: any,
    fieldName: string
  ) => {
    if (currentPersonas.length > 0) {
      setTimeout(() => {
        fieldProps.form.setFieldValue(fieldName, currentPersonas, true);
        fieldProps.form.setFieldTouched(fieldName, true, true);
        reset();
      }, 100); //Time before execution
    }
    if (pickerValue.length > 2) {
      const results = await PeoplePickerSearch({ pickerValue });
      // People picker user properties that are available
      const users = results.map((result: any) => {
        return { text: result.DisplayText, userId: result.EntityData.SPUserID };
      });

      return users;
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
