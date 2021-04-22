import {
  FontIcon,
  IBasePickerSuggestionsProps,
  Label,
  NormalPeoplePicker,
} from '@fluentui/react';
import { usePeoplePicker } from 'components/Hooks';
import { ErrorMessage, Field } from 'formik';

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
  AllowMultipleValues: boolean;
  status: string;
}
export const PeoplePicker = ({
  fieldName,
  title,
  icon,
  required,
  AllowMultipleValues,
}: PeoplePickerProps) => {
  const { searchPeople, setFormikValue } = usePeoplePicker();

  return (
    <>
      <Field name={fieldName} disabled={status === 'Submitted' ? true : false}>
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
                onChange={(pickerItems: any) => {
                  setFormikValue(pickerItems, fieldProps, fieldName);
                }}
                itemLimit={AllowMultipleValues ? undefined : 1}
                onResolveSuggestions={(filterText: any) => {
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
                onBlur={() => {
                  fieldProps.form.setFieldTouched(fieldName, true, true);
                }}
              />
              <ErrorMessage
                name={fieldName}
                render={(msg: any) => {
                  return (
                    <p
                      style={{
                        fontSize: '12px',
                        color: ' rgb(164, 38, 44)',
                        margin: '0px',
                        paddingTop: '5px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {msg}
                    </p>
                  );
                }}
              />
            </div>
          );
        }}
      </Field>
    </>
  );
};
