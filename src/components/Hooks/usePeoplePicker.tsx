import { useState, useEffect } from "react";
import { PeoplePickerSearch } from "../ApiCalls/PeoplePickerSearch/PeoplePickerSearch";
export const usePeoplePicker = () => {
  const [searchResults, setSearchResults] = useState([]);

  const reset = () => {
    setSearchResults([]);
  };

  const onChange = async (pickerValue: any) => {
    if (pickerValue.length > 2) {
      console.log(`pickerValue`, pickerValue);
      const results = await PeoplePickerSearch(pickerValue);
      console.log(`results`, results);
      // //@ts-ignore
      // setSearchResults(JSON.parse(results.d.ClientPeoplePickerSearchUser));
    }
  };

  return { onChange, searchResults, reset };
};
