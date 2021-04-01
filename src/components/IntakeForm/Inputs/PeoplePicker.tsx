import * as React from "react";
import { usePeoplePicker } from "components/Hooks/usePeoplePicker";
import {
  Checkbox,
  IBasePickerSuggestionsProps,
  NormalPeoplePicker,
  ValidationState,
  IPersonaProps,
} from "@fluentui/react";
import { people, mru } from "@uifabric/example-data";
const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Suggested People",
  mostRecentlyUsedHeaderText: "Suggested Contacts",
  noResultsFoundText: "No results found",
  loadingText: "Loading",
  showRemoveButtons: true,
  suggestionsAvailableAlertText: "People Picker Suggestions available",
  suggestionsContainerAriaLabel: "Suggested contacts",
};
console.log(`people`, people);
// const onFilterChanged = (
//   filterText: string,
//   currentPersonas: IPersonaProps[],
//   limitResults?: number
// ): IPersonaProps[] | Promise<IPersonaProps[]> => {
//   console.log(
//     "filterText:",
//     filterText,
//     "currentPersonas:",
//     currentPersonas,
//     "limitResults:",
//     limitResults
//   );
//   if (filterText) {
//     onChange(filterText);
//     return [];
//   } else {
//     return [];
//   }
// };

console.log(`people`, people);
export const PeoplePicker: React.FunctionComponent = () => {
  const { onChange, searchResults, reset } = usePeoplePicker();

  return (
    <NormalPeoplePicker
      // @ts-ignore
      onResolveSuggestions={onChange}
      // // @ts-ignore
      // onEmptyInputFocus={returnMostRecentlyUsed}
      // getTextFromItem={getTextFromItem}
      pickerSuggestionsProps={suggestionProps}
      // className={"ms-PeoplePicker"}
      key={"normal"}
      // // eslint-disable-next-line react/jsx-no-bind
      // onRemoveSuggestion={onRemoveSuggestion}
      onValidateInput={(input: any) => {
        console.log(`input`, input);
        return input;
      }}
      removeButtonAriaLabel={"Remove"}
      // inputProps={{
      //   onBlur: (ev: React.FocusEvent<HTMLInputElement>) =>
      //     console.log("onBlur called"),
      //   onFocus: (ev: React.FocusEvent<HTMLInputElement>) =>
      //     console.log("onFocus called"),
      //   "aria-label": "People Picker",
      // }}
      // componentRef={picker}
      onInputChange={(input: any) => {
        console.log(`input`, input);
        return input;
      }}
      // resolveDelay={300}
      // disabled={isPickerDisabled}
    />
  );
};
