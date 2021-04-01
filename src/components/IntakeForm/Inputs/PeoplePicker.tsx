import * as React from "react";
import { usePeoplePicker } from "components/Hooks/usePeoplePicker";
import {
  IBasePickerSuggestionsProps,
  NormalPeoplePicker,
} from "@fluentui/react";
import { Field } from "formik";

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Suggested People",
  mostRecentlyUsedHeaderText: "Suggested Contacts",
  noResultsFoundText: "No results found",
  loadingText: "Loading",
  showRemoveButtons: true,
  suggestionsAvailableAlertText: "People Picker Suggestions available",
  suggestionsContainerAriaLabel: "Suggested contacts",
};

interface PeoplePickerProps {
  fieldName: string;
}

export const PeoplePicker = ({ fieldName }: PeoplePickerProps) => {
  const { onChange, searchResults, reset } = usePeoplePicker();

  return (
    <Field name={fieldName}>
      {(fieldProps: any) => {
        return (
          <NormalPeoplePicker
            // @ts-ignore
            onResolveSuggestions={(
              filterText: any,
              currentPersonas: any,
              limitResults: any
            ) => {
              return onChange(
                filterText,
                currentPersonas,
                limitResults,
                fieldProps,
                fieldName
              );
            }}
            // // @ts-ignore
            // onEmptyInputFocus={returnMostRecentlyUsed}
            // getTextFromItem={getTextFromItem}
            pickerSuggestionsProps={suggestionProps}
            // className={"ms-PeoplePicker"}
            key={"normal"}
            // // eslint-disable-next-line react/jsx-no-bind
            // onRemoveSuggestion={onRemoveSuggestion}
            onValidateInput={(input: any) => {
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
              return input;
            }}
            // resolveDelay={300}
            // disabled={isPickerDisabled}
          />
        );
      }}
    </Field>
  );
};
