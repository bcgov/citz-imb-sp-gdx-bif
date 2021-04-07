import {
  IBasePickerSuggestionsProps,
  Label,
  NormalPeoplePicker,
  FontIcon,
} from '@fluentui/react';
import { usePeoplePicker } from 'components/Hooks/usePeoplePicker';
import { Field, ErrorMessage } from 'formik';
import * as React from 'react';

// import { ContactIcon } from "@fluentui/react-icons";
const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: true,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts',
};

interface PeoplePickerProps {
  fieldName: string;
  title: string;
  icon: string;
  description: string;
  required: boolean;
}
export const PeoplePicker = ({
  fieldName,
  title,
  icon,
  description,
  required,
}: PeoplePickerProps) => {
  const { searchPeople, setFormikValue } = usePeoplePicker();

  return (
    <>
      <Field name={fieldName}>
        {(fieldProps: any) => {
          return (
            <div>
              <div>
                {required ? (
                  <Label htmlFor={fieldName}>
                    <FontIcon iconName={icon} />
                    {title}*
                  </Label>
                ) : (
                  <Label htmlFor={fieldName}>
                    <FontIcon iconName={icon} />
                    {title}
                  </Label>
                )}
              </div>
              <NormalPeoplePicker
                className='test'
                id={fieldName}
                onChange={(pickerItems: any) => {
                  setFormikValue(pickerItems, fieldProps, fieldName);
                }}
                title='test'
                // @ts-ignore
                onResolveSuggestions={(
                  filterText: any,
                  currentPersonas: any,
                  limitResults: any
                ) => {
                  return searchPeople(filterText);
                }}
                pickerSuggestionsProps={suggestionProps}
                key={'normal'}
                onValidateInput={(input: any) => {
                  return input;
                }}
                removeButtonAriaLabel={'Remove'}
                onInputChange={(input: any) => {
                  return input;
                }}
              />
              <ErrorMessage name={fieldName}>
                {(message: string) => {
                  return <div>{message}</div>;
                }}
              </ErrorMessage>
            </div>
          );
        }}
      </Field>
    </>
  );
};
